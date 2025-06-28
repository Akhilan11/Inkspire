# 🖋️ Inkspire

**Inkspire** is a full-stack blogging platform where users can register, log in, and create, edit, view, and delete blogs — and now, also chat in real-time with other users!

Built with:

- **Backend**: Node.js + Express + MongoDB + JWT Authentication + Socket.IO  
- **Frontend**: Angular 17 + Bootstrap 5 + Socket.IO Client

---

## 📁 Project Structure

```
Inkspire/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── messageController.js          
│   ├── models/
│   │   ├── blog.js
│   │   ├── user.js
│   │   └── message.js                    
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── blogRouter.js
│   │   └── messageRouter.js             
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   │   └── socket.js                    
│   ├── .env
│   └── server.js                        
│
└── frontend/
    └── src/
        ├── app/
        │   ├── components/
        │   │   ├── blog/
        │   │   ├── auth/
        │   │   ├── shared/
        │   │   └── chat/                 
        │   ├── services/
        │   │   ├── blog.service.ts
        │   │   ├── auth/
        │   │   └── chat/              
        │   ├── interceptors/
        │   └── guards/
        ├── environments/
        └── assets/
```

---

## 🚀 Features

### ✅ User Authentication
- Register & login with email/password
- JWT-based session management
- Secure protected routes in frontend/backend

### ✅ Blogging System
- Create, view, edit, and delete blogs
- Each blog linked to a registered user
- Public access to read blogs
- Authenticated access to manage own content

### ✅ Profile Page
- `/profile` shows logged-in user's blogs
- Includes email, username, and authored posts

---

## 💬 Real-Time Chat (NEW)

- One-on-one **private messaging**
- Real-time updates using **Socket.IO**
- **MongoDB persistence** of chat messages
- Previous chat history loads when chatting resumes
- Sidebar shows **active online users**

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
node server.js
```

---

## ⚙️ Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start Angular app:
```bash
ng serve
```

---

## 🔌 API Routes Overview

### 🧑 Auth (Public)
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/auth/register` | Register new user      |
| POST   | `/api/auth/login`    | Login user             |
| GET    | `/api/auth/me`       | Get logged-in user     |

### 📖 Blog (Public + Auth)
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/posts`           | Get all blogs                  |
| GET    | `/api/posts/:id`       | Get single blog                |
| POST   | `/api/posts`           | Create blog (auth required)    |
| PUT    | `/api/posts/:id`       | Update blog (author only)      |
| DELETE | `/api/posts/:id`       | Delete blog (author only)      |
| GET    | `/api/posts/myblogs`   | Get blogs by logged-in user    |

### 💬 Chat (New)
| Method | Endpoint                                      | Description                    |
|--------|-----------------------------------------------|--------------------------------|
| POST   | `/api/messages`                               | Save a message                 |
| GET    | `/api/messages/:senderId/:receiverId`         | Get chat history between users |

---

## 🔐 Authentication Summary

- JWT token stored in `localStorage`
- Automatically added to requests via Angular interceptor
- Only blog **authors** can update/delete
- Only logged-in users can **send messages**

---

## 🧪 Postman Example

### Register
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

### Login
```http
POST /api/auth/login
```
```json
{
  "email": "akhil@gmail.com",
  "password": "abcdefgh"
}
```

### Save a Message
```http
POST /api/messages
Authorization: Bearer <token>
```
```json
{
  "sender": "userId1",
  "receiver": "userId2",
  "message": "Hey! How are you?"
}
```

### Get Chat History
```http
GET /api/messages/userId1/userId2
Authorization: Bearer <token>
```

---

## 🧠 Tech Stack

### Backend
- Node.js, Express.js
- MongoDB (Mongoose)
- JWT, bcrypt, dotenv
- Socket.IO (chat)

### Frontend
- Angular 17
- Bootstrap 5
- Angular Router
- Angular Interceptor
- Socket.IO client

---

## 🧾 How Real-Time Chat Works

1. User logs in → joins Socket.IO server with username
2. Active users list updates in real time
3. On selecting a user:
   - Fetches previous chat history via API
   - Opens chat window
4. Sends message → emits `private message` event via socket
5. Message is saved to DB via REST POST as well

---

## 📌 Notes

- Chat only works between logged-in users
- Message history is preserved between sessions
- Socket.IO handles active user syncing and delivery
- Future support for **group chat** or **notifications** possible

---

## ✅ What's Next?

- 🖼 Image upload for blogs & profile
- 📍 Tags and blog filtering
- 💬 Blog comments section
- 📱 Mobile view improvements
- 🧪 Unit tests for core modules

---

## 👤 Author

Developed with ❤️ by [Akhilan](https://github.com/Akhilan11)

---

```bash
git clone https://github.com/Akhilan11/Inkspire
cd Inkspire
```
Start blogging ✍️ and chatting 💬 now!

