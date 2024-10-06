const userModel = require("../models/userModel");

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!userModel.validateFields([username, email, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = userModel.loadUsers(); // Loads existing users from the mock-database
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser); // Adds a new user to the array
  userModel.saveUsers(users); // Saves newly created users to JSON
  res.status(201).send({ message: "User Registration Successful!" });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!userModel.validateFields([username, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = userModel.loadUsers(); // Loads existing users from the mock-database
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(400).send("Invalid Credentials.");

  const token = `token-${user.id}`; // Generates a token to be used for authentication
  res.send({ token }); // Returns the token back
};

const getProfile = (req, res) => {
  const userId = req.headers["user-id"];

  if (isNaN(userId)) {
    return res.status(400).send("Invalid user Id."); // Sends a specific error for Invalid ID's
  }

  const user = userModel.findUserById(parseInt(userId));

  if (!user) {
    return res.status(404).send("User does not exist."); // Sends a specfic error for unmatched ID's
  }

  res.send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = userModel.findUserById(parseInt(id)); // Finds matching ID's using method found at userModel.js

  if (!user) {
    return res.status(404).send("User does not exist.");
  }

  user.username = username || user.username;
  user.email = email || user.email;

  const users = userModel.loadUsers(); // Loads existing users from the mock-database
  userModel.saveUsers(users); // Saves newly created users to JSON
  res.send({ message: "User updated successfully" });
};

module.exports = {
  register,
  login,
  getProfile,
  updateUser,
};
