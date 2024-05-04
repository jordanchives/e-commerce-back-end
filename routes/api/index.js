// Import the Express router
const router = require('express').Router();

// Import the routes for categories, products, and tags
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the imported routes for handling requests to specific endpoints
router.use('/categories', categoryRoutes); // Handle requests related to categories
router.use('/products', productRoutes); // Handle requests related to products
router.use('/tags', tagRoutes); // Handle requests related to tags

// Export the router to make it available for use in other files
module.exports = router;
