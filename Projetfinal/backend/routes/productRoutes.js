import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Routes publiques : les visiteurs peuvent consulter les produits
router.route("/")
  .get(getProducts)
  .post(requireAdmin, createProduct);

router.route("/:id")
  .get(getProductById)
  .put(requireAdmin, updateProduct)
  .delete(requireAdmin, deleteProduct);

export default router;