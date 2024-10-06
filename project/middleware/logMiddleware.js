const loggingMiddleware = (req, res, next) => {
  const method = req.method; // Get the HTTP method (GET,POST etc.)
  const route = req.originalUrl; // Get the request URL
  const timestamp = new Date().toISOString(); // Get the current timestamp

  console.log(`[${timestamp}] ${method} request to ${route}`); // Logging the details

  next(); 
};

module.exports = {
  loggingMiddleware,
};
