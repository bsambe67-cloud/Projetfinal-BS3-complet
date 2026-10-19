import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

async function createAdmin() {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        "Configure ADMIN_EMAIL et ADMIN_PASSWORD dans le fichier .env."
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Configure JWT_SECRET dans le fichier .env.");
    }

    await connectDB();

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 12);

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";
      await existingAdmin.save();

      console.log("Mot de passe administrateur mis à jour.");
    } else {
      await User.create({
        email,
        password: hashedPassword,
        role: "admin"
      });

      console.log("Compte administrateur créé.");
    }
  } catch (error) {
    console.error("Erreur :", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

createAdmin();