
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const { loggingMiddleware } = require('./middleware/logMiddleware');

const app = express();   
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(loggingMiddleware); // Logs incoming requests

// Using user routes under /users
app.use('/users', userRoutes); // Mounts the user routes

app.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
