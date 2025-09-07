import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import Category from "./models/Category.js";
import Expense from "./models/Expense.js";
//import seedData  from "../seed.js";
//require('dotenv').config()

//dotenv.config({ path: '/custom/path/to/.env' })

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// ---------------------- USERS ----------------------
app.post("/users", async (req, res) => {
   console.log("Incoming data:", req.body);
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ---------------------- CATEGORIES ----------------------
app.post("/categories", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// ---------------------- EXPENSES ----------------------
app.post("/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.json(expense);
  } catch (err) {
    console.error("❌ Expense creation failed:", err.message);
    res.status(500).json({ error: err.message });

  }
});

app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find().populate("user category");
  res.json(expenses);
});

app.get("/expenses/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const expenses = await Expense.find({ user: userId }).populate("category");
  res.json(expenses);
});


// ---------------------- REPORTS ----------------------

// 📊 Total Expenses per User
app.get("/reports/user", async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          user: "$user.name",
          email: "$user.email",
          totalAmount: 1
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📊 Total Expenses per Category
app.get("/reports/category", async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          category: "$category.name",
          totalAmount: 1
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📊 Monthly Expense Summary
app.get("/reports/monthly", async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//seedData();


// ---------------------- SERVER ----------------------
app.listen(5000, () => {
  console.log(`🚀 Server running on http://localhost:5000 || ${process.env.PORT}`);
});
