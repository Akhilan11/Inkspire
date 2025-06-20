# 🖋️ Inkspire

**Inkspire** is a full-stack blogging platform where users can register, log in, and create, edit, view, and delete blogs. Built with:

- **Backend**: Node.js + Express + MongoDB + JWT Authentication  
- **Frontend**: Angular 17 + Bootstrap 5

---

## 📁 Project Structure

```
Inkspire/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── models/
│   │   ├── blog.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── blogRouter.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── app/
        │   ├── components/
        │   │   ├── blog/
        │   │   │   ├── blog-create/
        │   │   │   ├── blog-edit/
        │   │   │   ├── blog-list/
        │   │   │   ├── blog-detail/
        │   │   │   └── user-blogs/
        │   │   ├── auth/
        │   │   │   ├── login/
        │   │   │   └── register/
        │   │   └── shared/
        │   │       └── navbar/
        │   ├── services/
        │   │   ├── blog.service.ts
        │   │   └── auth/
        │   │       └── user.service.ts
        │   ├── interceptors/
        │   │   └── auth.interceptor.ts
        │   ├── guards/
        │   │   └── auth.guard.ts
        │   ├── app-routing.module.ts
        │   └── app.module.ts
        └── assets/
            └── icons/
```

---

## 🚀 Features

### ✅ User Authentication
- Register/Login with email & password
- Passwords hashed via `bcrypt`
- JWT token generated and stored in `localStorage`
- Token auto-attached via Angular **interceptor**
- Protected routes secured both in frontend & backend

### ✅ Blog System
- Public blog listing
- Blog detail view with author info
- Authenticated users can:
  - Create new blogs
  - Edit/Delete **only their own blogs**
- Backend verifies authorship before allowing updates/deletes
- Blogs sorted by newest first

### ✅ User Profile
- `/profile` route shows:
  - Logged-in user's name and email
  - All blogs written by them

---

## ⚙️ Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Start server:

```bash
nodemon server.js
```

---

## ⚙️ Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the app:

```bash
ng serve
```

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- dotenv

### Frontend
- Angular 17
- Bootstrap 5
- Angular Router
- Angular Interceptor
- Angular Reactive Forms

---

## 🔐 Routes Overview

### ✅ Public
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register user            |
| POST   | `/api/auth/login`    | Login user               |
| GET    | `/api/posts`         | Get all blogs            |
| GET    | `/api/posts/:id`     | Get a single blog        |

### 🔒 Auth-Protected
| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/api/posts`          | Create blog (auth only)    |
| PUT    | `/api/posts/:id`      | Update blog (author only)  |
| DELETE | `/api/posts/:id`      | Delete blog (author only)  |
| GET    | `/api/posts/myblogs`  | Get blogs by logged-in user|
| GET    | `/api/auth/me`        | Get logged-in user details |

**Auth Header Format**:
```
Authorization: Bearer <JWT Token>
```

---

## ✅ How to Test in Postman

### 1. Register
```http
POST /api/auth/register
```
```json
{
  "username": "akhilan",
  "email": "akhil@gmail.com",
  "password": "abcdefgh"
}
```

### 2. Login
```http
POST /api/auth/login
```
```json
{
  "email": "akhil@gmail.com",
  "password": "abcdefgh"
}
```

Response:
```json
{
  "token": "<JWT Token>",
  "user": {
    "id": "...",
    "username": "akhilan",
    "email": "akhil@gmail.com"
  }
}
```

### 3. Create Blog
```http
POST /api/posts
```
Headers:
```
Authorization: Bearer <token>
```
Body:
```json
{
  "title": "How I Started Inkspire",
  "content": "This blog explains how the idea of Inkspire was born..."
}
```

---

## 🔒 Access Control Summary

- Frontend:
  - Shows Edit/Delete buttons only if `localStorage.userId === blog.author._id`
- Backend:
  - Validates ownership before allowing update/delete

---

## ✨ What's Next?

Here are possible next features:

### 💬 Chat Integration (like Facebook Messenger)
- One-on-one messaging (not real-time comments)
- Socket.IO-based
- Chatbox attached to profile section

### 🧑 Profile Enhancements
- Profile picture upload
- User bio, join date, etc.

### 📦 Extra Features
- Blog image support (Cloudinary/S3)
- Tags/categories
- Like & share buttons
- Follow authors