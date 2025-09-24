# Backend Setup Instructions

## 1. Install Dependencies
```bash
cd backend
npm install
```

## 2. Setup Environment Variables
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

Edit `.env` file with your database and email credentials:
- DB_HOST=localhost
- DB_USER=your_mysql_username
- DB_PASS=your_mysql_password
- DB_NAME=pixel_photography
- JWT_SECRET=your_secret_key
- EMAIL_USER=your_gmail@gmail.com
- EMAIL_PASS=your_app_password

## 3. Setup Database
Create MySQL database and run the schema:
```sql
CREATE DATABASE pixel_photography;
USE pixel_photography;
-- Run the SQL from ../../schema.sql
```

## 4. Start Backend Server
```bash
npm run dev
```

You should see:
- "Server running on http://localhost:5000"
- "Database connected!"