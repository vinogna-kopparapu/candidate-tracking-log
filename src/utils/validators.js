
export const isValidUsername = (username) => {
 
  if (!username || typeof username !== 'string') {
    return false;
  }

  const trimmedUsername = username.trim();
  if (trimmedUsername.length === 0) {
    return false;
  }

  if (trimmedUsername.toLowerCase() === 'dog') {
    return false;
  }

  const validUsernamePattern = /^[a-zA-Z0-9_]+$/;
  return validUsernamePattern.test(trimmedUsername);
};
  
  
  export const validateApplication = (application) => {
    const errors = {};
  
    if (!application.company?.trim()) {
      errors.company = 'Company name is required';
    }
  
    if (!application.position?.trim()) {
      errors.position = 'Position is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };