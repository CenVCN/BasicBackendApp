const userModel = require("../models/userModel");

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!userModel.validateFields([username, email, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = userModel.loadUsers();
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  userModel.saveUsers(users);
  res.status(201).send({ message: "User Registration Successful!" });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!userModel.validateFields([username, password])) {
    return res.status(400).send("All Fields are Required!");
  }

  const users = userModel.loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(400).send("Invalid Credentials.");

  const token = `token-${user.id}`;
  res.send({ token });
};

const getProfile = (req, res) => {
  const userId = req.headers["user-id"];

  if (isNaN(userId)) {
    return res.status(400).send("Invalid user Id.");
  }

  const user = userModel.findUserById(parseInt(userId));

  if (!user) {
    return res.status(404).send("User does not exist.");
  }

  res.send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = userModel.findUserById(parseInt(id));

  if (!user) {
    return res.status(404).send("User does not exist.");
  }

  user.username = username || user.username;
  user.email = email || user.email;

  const users = userModel.loadUsers();
  userModel.saveUsers(users);
  res.send({ message: "User updated successfully" });
};

module.exports = {
  register,
  login,
  getProfile,
  updateUser,
};
