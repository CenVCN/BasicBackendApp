const permissionsChecking = (req, res, next) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res.status(401).send("Access denied.");
  }

  req.userId = userId; // Attach user ID to request for further use
  next();
};

module.exports = {
  permissionsChecking,
};
