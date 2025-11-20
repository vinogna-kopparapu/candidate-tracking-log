import express from 'express';
import cookieParser from 'cookie-parser';
import applications from './applications.js';
import sessions from './sessions.js';
import users from './users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message:'Authentication required.'});
    return;
  }
  res.status(200).json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({error: 'required-username', message: 'A valid username is required.'});
    return;
  }

  if(!users.isValidUsernamePattern(username)) {
    res.status(400).json({error: 'invalid-username', message: 'Username can only contain letters, numbers, and underscores'});
    return;
  }

  if (!users.isNotDog(username)) {
    res.status(403).json({ error: 'auth-insufficient', message: 'You are not authorized to use this username.'});
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, applications.makeApplication());
  }

  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.status(200).json({ username });
});

// Applications
app.get('/api/applications', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message: 'Please login first' });
    return;
  }
  res.json(users.getUserData(username).getApplications());
});

app.post('/api/applications', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message: 'Please login first' });
    return;
  }

  const { company, position } = req.body;
  
  if(!company || !position) {
    res.status(400).json({ 
      error: 'required-fields', 
      message: 'Company and position are required fields' 
    });
    return;
  }

  if(!applications.isValidCompanyName(company)) {
    res.status(400).json({ 
      error: 'invalid-company',
      message: 'Company name can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  if(!applications.isValidPosition(position)) {
    res.status(400).json({ 
      error: 'invalid-position',
      message: 'Position can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  const applicationList = users.getUserData(username);
  const newApplication = applicationList.addApplication(req.body); 
  res.status(201).json(newApplication);  
});

app.put('/api/applications/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message: 'Please login first' });
    return;
  }

  const applicationList = users.getUserData(username);
  const { id } = req.params;
  const { company, position } = req.body;

  if(!applicationList.contains(id)) {
    res.status(404).json({ error: 'not-found', message: `No application with id ${id}` }); 
    return;
  }

  if(!company || !position) {
    res.status(400).json({ 
      error: 'required-fields', 
      message: 'Company and position are required fields' 
    });
    return;
  }

  if(!applications.isValidCompanyName(company)) {
    res.status(400).json({ 
      error: 'invalid-company',
      message: 'Company name can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  if(!applications.isValidPosition(position)) {
    res.status(400).json({ 
      error: 'invalid-position',
      message: 'Position can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  applicationList.updateApplication(id, req.body);
  res.json(applicationList.getApplication(id));
});

app.patch('/api/applications/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message: 'Please login first' });
    return;
  }

  const { id } = req.params;
  const applicationList = users.getUserData(username);
  
  if(!applicationList.contains(id)) {
    res.status(404).json({ error: 'not-found', message: `No application with id ${id}` }); 
    return;
  }

  const { company, position } = req.body;

  if(company && !applications.isValidCompanyName(company)) {
    res.status(400).json({ 
      error: 'invalid-company',
      message: 'Company name can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  if(position && !applications.isValidPosition(position)) {
    res.status(400).json({ 
      error: 'invalid-position',
      message: 'Position can only contain letters, numbers, spaces, and basic punctuation' 
    });
    return;
  }

  applicationList.updateApplication(id, req.body);
  res.json(applicationList.getApplication(id));
});

app.delete('/api/applications/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing', message: 'Please login first' });
    return;
  }

  const { id } = req.params;
  const applicationList = users.getUserData(username);
  
  if(!applicationList.contains(id)) {
    res.status(404).json({ error: 'not-found', message: 'Application not found' });
    return;
  }

  applicationList.deleteApplication(id);
  res.json({ message: 'Application deleted successfully' });
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));