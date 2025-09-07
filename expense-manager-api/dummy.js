import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Category from "./models/Category.js";
import Expense from "./models/Expense.js";

dotenv.config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017')
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Expense.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Jim", email: "jim@example.com" }
    ]);

    // Create sample categories
    const categories = await Category.insertMany([
      { name: "Food" },
      { name: "Travel" },
      { name: "Shopping" },
      { name: "Bike" }
    ]);

    // Create sample expenses
    await Expense.insertMany([
      {
        user: users[0]._id,
        category: categories[0]._id,
        amount: 200,
        description: "Lunch at cafe"
      },
      {
        user: users[0]._id,
        category: categories[1]._id,
        amount: 1500,
        description: "Train ticket"
      },
      {
        user: users[1]._id,
        category: categories[2]._id,
        amount: 800,
        description: "Clothes shopping"
      },
      {
        user: users[2]._id,
        category: categories[3]._id,
        amount: 600,
        description: "Clothes shopping"
      }

    ]);

    console.log("🌱 Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

  seedData();
export {seedData};