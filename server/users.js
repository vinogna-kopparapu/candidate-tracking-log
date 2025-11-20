const users = {};

const isValid = (username) => {
  return username && username.trim().length > 0;
};

const isValidUsernamePattern = (username) => {
  const pattern = /^[a-zA-Z0-9_]+$/;
  return pattern.test(username);
};

const isNotDog = (username) => {
  return username.toLowerCase() !== 'dog';
};

const getUserData = (username) => {
  return users[username];
};

const addUserData = (username, applicationList) => {
  users[username] = applicationList;
};

export default {
  isValid,
  isNotDog,
  getUserData,
  addUserData,
  isValidUsernamePattern, 
};