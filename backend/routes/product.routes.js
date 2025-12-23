const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct
} = require("../controllers/product.controller");

const { protect, restrictTo } = require("../middleware/auth.middleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Seller-only route
router.post("/", protect, restrictTo("seller", "admin"), createProduct);

// Delete route
router.delete("/:id", protect, deleteProduct);

module.exports = router;