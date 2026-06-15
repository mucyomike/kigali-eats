import Product from "../models/product.model.js";

// Get all products with filtering
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, available } = req.query;

    // Build filter object dynamically
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (available !== undefined) {
      filter.isAvailable = available === "true";
    }

    // Find products and populate category
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, preparationTime, calories, tags } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      preparationTime,
      calories,
      tags,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update any provided fields
    Object.assign(product, req.body);

    // Save updated product
    const updatedProduct = await product.save();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get featured products (popular items)
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true, tags: "popular" })
      .populate("category", "name slug")
      .sort({ averageRating: -1 })
      .limit(8);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
