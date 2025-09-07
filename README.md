readme_content = """# 📊 Expense Manager API

A simple **Node.js + Express + MongoDB** backend to manage users, categories, expenses, and generate reports (JSON + PDF).

---

## 🚀 Features
- 👤 **User Management** (create, list)
- 🏷️ **Category Management** (create, list)
- 💰 **Expense Tracking** (add, list, filter by user)
- 📊 **Reports**
  - Total expenses per user
  - Total expenses per category
  - Monthly expense summary
- 📄 **PDF Export** of reports

---

## 🛠️ Tech Stack
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **PDFKit** (for report generation)
- **dotenv** (for environment variables)

---

## 📂 Project Structure
expense-manager-api/
├── models/
│ ├── User.js
│ ├── Category.js
│ └── Expense.js
├── seed.js
├── server.js
├── .env
├── package.json
└── README.md

yaml
Always show details

Copy code

---


## ⚙️ Installation

1. Clone the repo
   ```bash
   git clone https://github.com/your-username/expense-manager-api.git
   cd expense-manager-api
Install dependencies

bash
Always show details

Copy code
npm install
Setup .env file

env
Always show details

Copy code
MONGO_URI=mongodb://127.0.0.1:27017/expense_manager
PORT=5000
Start MongoDB (local or Atlas)

Local (Linux/Mac):

bash
Always show details

Copy code
mongod
Windows:

powershell
Always show details

Copy code
net start MongoDB
Run the server

bash
Always show details

Copy code
node server.js
(Optional) Seed sample data

bash
Always show details

Copy code
node seed.js
📌 API Endpoints
🧑 Users
POST /users → Create user

json
Always show details

Copy code
{ "name": "Alice", "email": "alice@example.com" }
GET /users → List all users

🏷️ Categories
POST /categories → Create category

json
Always show details

Copy code
{ "name": "Food" }
GET /categories → List all categories

💰 Expenses
POST /expenses → Create expense

json
Always show details

Copy code
{
  "user": "USER_ID",
  "category": "CATEGORY_ID",
  "amount": 250,
  "description": "Lunch"
}
GET /expenses → List all expenses (with user + category)

GET /expenses/user/:userId → Get expenses for a user

📊 Reports (JSON)
GET /reports/user → Expenses per user

GET /reports/category → Expenses per category

GET /reports/monthly → Monthly summary

✅ Next Steps

Add JWT Authentication

Add budget limits & alerts

Add CSV export option
