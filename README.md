# Negozio — Modern MERN Ecommerce Platform

Negozio is a full-stack modern ecommerce platform built using the MERN stack.
It features authentication, product management, wishlist functionality, reviews, payments, admin controls, responsive UI, and polished user experience enhancements.

Designed as a production-style portfolio project focused on clean architecture, modern frontend UX, and real-world ecommerce flows.

---

## Live Demo

Frontend: https://negozio-web.vercel.app

Backend API: https://negozio-backend-dkzl.onrender.com

---

## Features

### User Features

* User authentication with JWT
* Login & Registration
* Product browsing
* Product search & category filtering
* Product sorting
* Product reviews & ratings
* Wishlist functionality
* Dynamic cart quantity controls
* Related product recommendations
* Responsive cart & checkout flow
* Razorpay payment integration
* Pay Later option
* Order history
* Toast notifications
* Skeleton loaders
* Smooth UI animations

---

### Admin Features

* Admin authentication
* Create products
* Edit products
* Delete products
* Upload product images
* Manage orders
* Mark orders as delivered

---

## Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Tailwind CSS
* Axios
* Framer Motion
* React Hot Toast
* React Loading Skeleton

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Razorpay API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## Installation

### Clone Repository

```bash
git clone https://github.com/utkarshh9/mern-ecommerce.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=
MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Run backend:

```bash
npm run server
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_RAZORPAY_KEY_ID=
```

Create `.env.development`:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## Project Structure

```text
frontend/
backend/
```

Frontend handles UI, routing, state management, and user experience.

Backend handles API routes, authentication, database operations, payments, and order management.

---

## Key Highlights

* Production-style ecommerce architecture
* Modern responsive UI/UX
* Dynamic cart interactions
* Real payment integration
* Protected admin routes
* Clean reusable component structure
* Smooth frontend animations
* Full deployment pipeline
