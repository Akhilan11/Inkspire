# 🖋️ Inkspire

**Inkspire** is a full-stack blogging platform where users can register, log in, and create, edit, view, and delete blogs. Built with:

- **Backend**: Node.js + Express + MongoDB + JWT Authentication  
- **Frontend**: Angular 17 + Bootstrap 5

---

## 📂 Project Structure

```
Inkspire/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── frontend/
    └── src/
        ├── app/
        │   ├── components/
        │   ├── services/
        │   └── interceptors/
```

---

## 🚀 Features

### ✅ User Authentication
- Register and Login with email & password
- Passwords are hashed using `bcrypt`
- JWT token is generated and stored in `localStorage`
- Protected routes (create/update/delete blogs) using token

### ✅ Blog System
- View all blogs (public)
- View single blog
- Create blog (only logged-in users)
- Update/delete blog (only by the blog's author)
- Author name linked to registered user (via Mongoose `populate`)
- Sorted by newest first

### ✅ Frontend UI
- Responsive UI using **Bootstrap 5**
- Angular Forms for create/edit blog
- Navigation bar with login/logout toggle
- Blog card list, detail view, and form pages styled

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

3. Start the server:

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

2. Start the app:

```bash
ng serve
```

---

## 🔐 Routes Overview

### ✅ Public Routes (No Auth)
| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/posts`      | Get all blogs      |
| GET    | `/api/posts/:id`  | Get single blog    |
| POST   | `/api/auth/login` | User login         |
| POST   | `/api/auth/register` | User registration |

---

### 🔒 Protected Routes (Requires JWT Token)
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/api/posts`     | Create blog         |
| PUT    | `/api/posts/:id` | Update blog         |
| DELETE | `/api/posts/:id`| Delete blog         |

Token must be sent as:
```
Authorization: Bearer <your-token>
```

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt

### Frontend
- Angular 17
- Angular Router
- Angular Interceptors (for auth header)
- Bootstrap 5

---

## ✅ How to Test in Postman

1. **Register a user**  
   `POST /api/auth/register`  
   Body:
   ```json
   {
     "username": "akhilan",
     "email": "akhilan11122001@gmail.com",
     "password": "123456"
   }
   ```

2. **Login**  
   `POST /api/auth/login`  
   Body:
   ```json
   {
     "email": "akhilan11122001@gmail.com",
     "password": "123456"
   }
   ```  
   → Returns a `token` and `user` object.

3. **Create Blog**  
   `POST /api/posts`  
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

## 🔒 Auth & Access Control Summary

- **Only blog authors** can edit or delete their own blogs.
- Frontend UI conditionally shows Edit/Delete based on `localStorage.userId === blog.author._id`
- Backend also validates this match before allowing update/delete

---

## ✨ To Do (Future Enhancements)

- Add comments on blogs
- Add profile pages for authors
- Add categories or tags
- Image upload support
- Pagination or infinite scroll

---
