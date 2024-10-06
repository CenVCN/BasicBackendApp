const fs = require("fs");
const usersFileLocation = "./data/users.json";

// Loads users from JSON
const loadUsers = () => {
  const data = fs.readFileSync(usersFileLocation);
  return JSON.parse(data);
};

// Saves users to JSON
const saveUsers = (users) => {
  fs.writeFileSync(usersFileLocation, JSON.stringify(users, null, 3));
};

// Helper function to find a user by ID
const findUserById = (id) => {
  const users = loadUsers();
  return users.find((user) => user.id === id);
};

// Function to validate required fields
const validateFields = (fields) => {
  return fields.every((field) => field);
};

// Exporting model functions
module.exports = {
  loadUsers,
  saveUsers,
  findUserById,
  validateFields,
};
