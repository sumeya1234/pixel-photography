j# Pixel Photography App

Integrated photography portfolio application with Express backend and React frontend.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- Git

### Setup

1. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. **Database Setup:**
- Create a MySQL database
- Update backend/.env with your database credentials:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

3. **Run the application:**

**Option 1: Run both together (from root directory):**
```bash
npm run dev
```

**Option 2: Run separately:**

Backend (runs on http://localhost:5000):
```bash
cd backend
npm run dev
```

Frontend (runs on http://localhost:8080):
```bash
cd frontend
npm run dev
```

## Features

- Photography portfolio showcase
- Booking system with email notifications
- Admin authentication
- Service management
- Testimonials
- Responsive design

## API Endpoints

- `POST /auth/register` - Register admin
- `POST /auth/login` - Admin login
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `GET /api/services` - Get services
- `GET /api/testimonials` - Get testimonials

## Tech Stack

**Backend:**
- Express.js
- MySQL
- JWT Authentication
- Nodemailer

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router