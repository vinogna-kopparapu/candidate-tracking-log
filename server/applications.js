import { randomUUID as uuid } from 'crypto';

const isValidCompanyName = (company) => {
  const pattern = /^[a-zA-Z0-9\s\-&,.()]+$/;
  return company && company.trim().length > 0 && pattern.test(company);
};

const isValidPosition = (position) => {
  const pattern = /^[a-zA-Z0-9\s\-&,.()]+$/;
  return position && position.trim().length > 0 && pattern.test(position);
};


function makeApplication() {
  const applications = {}; 

  return {
    getApplications: () => Object.values(applications), 

    addApplication: ({ company, position, status, notes }) => {
      const id = uuid();
      applications[id] = {
        id,
        company,
        position,
        
        status: status || 'APPLIED',
        notes: notes || '',
        
      };
      return applications[id]; 
    },

    getApplication: (id) => applications[id] || null, 

    contains: (id) => !!applications[id],

    updateApplication: (id, updates) => {
      if (applications[id]) {
        applications[id] = { ...applications[id], ...updates }; 
        return applications[id];
      }
      return null;
    },

    deleteApplication: (id) => {
      if (applications[id]) {
        delete applications[id];
        return true;
      }
      return false;
    },
  };
}

export default {
  makeApplication,
  isValidCompanyName,
  isValidPosition,

};