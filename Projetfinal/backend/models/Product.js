import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Le nom est obligatoire"], trim: true, maxlength: 120 },
    category: { type: String, required: [true, "La catégorie est obligatoire"], trim: true },
    price: { type: Number, required: [true, "Le prix est obligatoire"], min: 0 },
    description: { type: String, default: "", trim: true, maxlength: 1000 },
    image: { type: String, default: "" },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
