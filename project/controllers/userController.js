const fs = require("fs"); // Includes the built-in File System module
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

// Helper function to match userID's
const findUserById = (users, id) => {
  return users.find((user) => user.id === id);
};

// Helper function for required inputs during validation
const validateFields = (fields) => {
  return fields.every((field) => field);
};

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!validateFields([username, email, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = loadUsers(); // Loads existing users from the mock-database
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser); // Adds a new user to the array
  saveUsers(users); // Saves newly created users to JSON
  res.status(201).send({ message: "User Registration Successful!" });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!validateFields([username, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = loadUsers(); // Loads existing users from the mock-database
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(400).send("Invalid Credentials.");

  const token = `token-${user.id}`; // Generates a token to be used for authentication
  res.send({ token }); // Returns the token back
};

const getProfile = (req, res) => {
  const userId = req.headers["user-id"]; // Gets the userID from headers


  if (isNaN(userId)) {
    return res.status(400).send("Invalid user Id.");
  }

  const users = loadUsers();
  const user = findUserById(users, parseInt(userId));

  if (!user) {
    return res.status(404).send("User does not exist.");
  }

  res.send(user); // Sends user profile
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const users = loadUsers();
  const user = findUserById(users, parseInt(id));

  if (!user) {
    return res.status(404).send("User does not exist.");
  }

  user.username = username || user.username;
  user.email = email || user.email;

  saveUsers(users);
  res.send({ message: "User updated successfully" });
};

module.exports = {
  register,
  login,
  getProfile,
  updateUser,
};
