// Import express router and models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route to get all tags
router.get('/', async (req, res) => {
  try {
    // Retrieve all tags and include associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    // Respond with the retrieved tag data
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to get a specific tag by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a tag by its primary key (ID) and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    // If no tag is found with the given ID, respond with a 404 status code
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // Respond with the retrieved tag data
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag with the data provided in the request body
    const tagData = await Tag.create(req.body);
    // Respond with the created tag data and a 201 status code
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update an existing tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If no tag is found with the given ID, respond with a 404 status code
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // Respond with the updated tag data
    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no tag is found with the given ID, respond with a 404 status code
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // Respond with a success message and a 200 status code
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
