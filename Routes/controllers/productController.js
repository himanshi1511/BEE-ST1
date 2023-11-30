const Product = require('../models/Product');
const Review = require('../models/Review');


// Create
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get 
async function getAllProducts(req, res) {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get particular
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update 
async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete 
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addReviewToProduct(req, res) {
 
}

async function getReviewsForProduct(req, res) {
}

async function updateReviewInProduct(req, res) {
}

async function deleteReviewInProduct(req, res) {
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReviewToProduct,
  getReviewsForProduct,
  updateReviewInProduct,
  deleteReviewInProduct,
};
