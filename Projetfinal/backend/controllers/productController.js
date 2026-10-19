import mongoose from "mongoose";
import Product from "../models/Product.js";

export async function getProducts(req, res, next) {
  try {
    const { search = "", category = "", available } = req.query;
    const filter = {};
    if (search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } }
      ];
    }
    if (category.trim() && category !== "Toutes") filter.category = category;
    if (available === "true") filter.available = true;
    if (available === "false") filter.available = false;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Identifiant produit invalide." });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Produit introuvable." });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, category, price, description, image, available } = req.body;
    if (!name || !category || price === undefined || price === "") {
      return res.status(400).json({ success: false, message: "Les champs nom, catégorie et prix sont obligatoires." });
    }
    const product = await Product.create({ name, category, price, description, image, available });
    res.status(201).json({ success: true, message: "Produit créé.", data: product });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Identifiant produit invalide." });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!product) return res.status(404).json({ success: false, message: "Produit introuvable." });
    res.json({ success: true, message: "Produit modifié.", data: product });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Identifiant produit invalide." });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Produit introuvable." });
    res.json({ success: true, message: "Produit supprimé.", data: product });
  } catch (error) {
    next(error);
  }
}
