const Review = require('../models/Review');

// Add 
async function addReviewToProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = await Review.create(req.body);
    product.reviews.push(review);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get 
async function getReviewsForProduct(req, res) {
  try {
    const { productId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    const product = await Product.findById(productId).populate({
      path: 'reviews',
      options: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update
async function updateReviewInProduct(req, res) {
  try {
    const { productId, reviewId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviewIndex = product.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }

    Object.assign(product.reviews[reviewIndex], req.body);
    await product.save();

    res.status(200).json(product.reviews[reviewIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete 
async function deleteReviewInProduct(req, res) {
  try {
    const { productId, reviewId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviewIndex = product.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const deletedReview = product.reviews.splice(reviewIndex, 1)[0];
    await product.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addReviewToProduct,
  getReviewsForProduct,
  updateReviewInProduct,
  deleteReviewInProduct,
};
