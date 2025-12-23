const Product = require("../models/Product");

// CREATE product (seller only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      seller: req.user._id   // comes from protect middleware
    });

    res.status(201).json(newProduct);

  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL products (public)
exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("seller", "name email");
  res.json(products);
};


// GET SINGLE product (public)
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller", "name email");

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};


// DELETE product (seller or admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Only seller or admin can delete
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });

  } catch (err) {
    console.error("Delete product error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
