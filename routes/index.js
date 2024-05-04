// Import the Express router
const router = require('express').Router();

// Import the API routes
const apiRoutes = require('./api');

// Use the API routes for requests to the '/api' base endpoint
router.use('/api', apiRoutes);

// Middleware to handle requests to undefined routes
router.use((req, res) => {
  // Respond with a 404 status code and a message indicating the wrong route
  res.status(404).send("<h1>Wrong Route!</h1>");
});

// Export the router to make it available for use in other files
module.exports = router;
