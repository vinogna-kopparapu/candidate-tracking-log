const sessions = {};

const addSession = (username) => {
  const sid =  crypto.randomUUID();
  sessions[sid] = { username };
  return sid;
};

const getSessionUser = (sid) => {
  return sessions[sid]?.username;
};

const deleteSession = (sid) => {
  delete sessions[sid];
};

export default {
  addSession,
  deleteSession,
  getSessionUser,
};