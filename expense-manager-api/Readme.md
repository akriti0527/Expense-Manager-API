📊 Expense Manager API

A simple Node.js + Express + MongoDB backend to manage users, categories, expenses, and generate reports (JSON + PDF).

🚀 Features

👤 User Management (create, list)

🏷️ Category Management (create, list)

💰 Expense Tracking (add, list, filter by user)

📊 Reports

Total expenses per user

Total expenses per category

Monthly expense summary

📄 PDF Export of reports

🛠️ Tech Stack

Node.js + Express

MongoDB + Mongoose

PDFKit (for report generation)

dotenv (for environment variables)

📂 Project Structure
expense-manager-api/
 ├── models/
 │    ├── User.js
 │    ├── Category.js
 │    └── Expense.js
 ├── seed.js
 ├── server.js
 ├── .env
 ├── package.json
 └── README.md

⚙️ Installation

Clone the repo

git clone https://github.com/your-username/expense-manager-api.git
cd expense-manager-api


Install dependencies

npm install


Setup .env file

MONGO_URI=mongodb://127.0.0.1:27017/expense_manager
PORT=5000


Start MongoDB (local or Atlas)

Local (Linux/Mac):

mongod


Windows:

net start MongoDB


Run the server

node server.js


(Optional) Seed sample data

node seed.js

📌 API Endpoints
🧑 Users

POST /users → Create user

{ "name": "Alice", "email": "alice@example.com" }


GET /users → List all users

🏷️ Categories

POST /categories → Create category

{ "name": "Food" }


GET /categories → List all categories

💰 Expenses

POST /expenses → Create expense

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