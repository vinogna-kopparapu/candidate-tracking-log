export function login(username) {
  
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' })) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      
      return response.json().then(err => Promise.reject(err));
    });
}

export function logout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' })) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
}

export function checkSession() {
  return fetch('/api/session')
    .catch(() => Promise.reject({ error: 'networkError' })) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
}