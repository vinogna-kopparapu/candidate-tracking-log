export const getApplications = () => {
  return fetch('/api/applications')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch(error => Promise.reject({ error }))
      .then((err) => Promise.reject(err));
    });
};

export const addApplication = (applicationData) => {
  return fetch('/api/applications', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(applicationData),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch(error => Promise.reject({ error }))
      .then((err) => Promise.reject(err));
    });
};

export const updateApplication = (id, updates) => {
  return fetch(`/api/applications/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(updates),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch(error => Promise.reject({ error }))
      .then((err) => Promise.reject(err));
    });
};

export const deleteApplication = (id) => {
  return fetch(`/api/applications/${id}`, {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch(error => Promise.reject({ error }))
      .then((err) => Promise.reject(err));
    });
};

