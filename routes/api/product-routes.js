// Import necessary modules and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Route to get all products
router.get('/', async (req, res) => {
  try {
    // Retrieve all products and include associated Category and Tag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    // Respond with the retrieved product data
    res.status(200).json(productData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a product by its primary key (ID) and include associated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    // If no product is found with the given ID, respond with a 404 status code
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    // Respond with the retrieved product data
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product with the data provided in the request body
    const productData = await Product.create(req.body);
    // If there are product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    // Respond with the created product data and a 201 status code
    res.status(201).json(productData);
  } catch (err) {
    // Handle validation errors and respond with a 400 status code
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    const [updatedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if the product was found and updated
    if (updatedRows === 0) {
      // Product with the specified ID was not found
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle associated tags if tagIds are provided
    if (req.body.tagIds && req.body.tagIds.length) {
      // Find existing product tags
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Remove existing product tags and create new ones
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Fetch the updated product and respond
    const updatedProduct = await Product.findByPk(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Route to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the product with the given ID
    const deleted = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no product is found with the given ID, respond with a 404 status code
    if (!deleted) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    // Respond with the deleted product data
    res.status(200).json(deleted);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
