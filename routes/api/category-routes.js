// Import necessary modules and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to get all categories
router.get('/', async (req, res) => {
  try {
    // Retrieve all categories and include associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with the retrieved category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to get a specific category by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a category by its primary key (ID) and include associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // If no category is found with the given ID, respond with a 404 status code
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    // Respond with the retrieved category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with the data provided in the request body
    const categoryData = await Category.create(req.body);
    // Respond with the created category data and a 201 status code
    res.status(201).json(categoryData);
  } catch (err) {
    // Handle validation errors and respond with a 400 status code
    res.status(400).json(err);
  }
});

// Route to update an existing category
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the data provided in the request body
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If no category is found with the given ID, respond with a 404 status code
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    // Respond with the updated category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the category with the given ID
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no category is found with the given ID, respond with a 404 status code
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    // Respond with a success message and a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router to make it available for use in other files
module.exports = router;
