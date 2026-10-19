import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Ordinateurs", category: "Informatique", price: 150000,
    description: "Ordinateurs portables et de bureau de grandes marques.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    available: true
  },
  {
    name: "Imprimantes", category: "Informatique", price: 300000,
    description: "Imprimantes laser, jet d'encre et multifonctions.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=85",
    available: true
  },
  {
    name: "Réfrigérateurs", category: "Électroménager", price: 400000,
    description: "Des solutions de conservation pour la maison et le bureau.",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=85",
    available: true
  },
  {
    name: "Micro-ondes", category: "Électroménager", price: 100000,
    description: "Des appareils pratiques pour réchauffer et préparer vos repas.",
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1000&q=85",
    available: true
  },
  {
    name: "Chauffe-eaux", category: "Électroménager", price: 15000,
    description: "Des équipements pour le confort au quotidien.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85",
    available: true
  },
  {
    name: "Cuisinières", category: "Électroménager", price: 450000,
    description: "Des cuisinières adaptées aux besoins de votre foyer.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
    available: true
  }
];

try {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`${products.length} produits de démonstration ajoutés.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
