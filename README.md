# 💬 Inkspire Chat Feature – Real-Time Messaging

This update adds **private real-time chat functionality** to the Inkspire blogging platform. Users can now send and receive messages with other active users while also retaining their chat history.

---

## ✨ New Features Added

### ✅ Real-Time Private Messaging
- Authenticated users can chat 1-on-1 using WebSocket.
- Built with **Socket.IO** on both client and server.

### ✅ Message Persistence
- All sent messages are stored in **MongoDB**.
- Chat history loads automatically when you select a user.

### ✅ Active Users Sidebar
- See who is online and initiate a conversation instantly.

---

## 🛠 Backend Additions

### ✅ New API Routes
- `POST /api/messages` — Save a new message
- `GET /api/messages/:sender/:receiver` — Fetch chat history between two users

### ✅ Message Model
A simple schema with `sender`, `receiver`, and `message` fields, plus timestamps.

### ✅ Socket.IO Integration
- New file: `config/socket.js`
- Handles:
  - New user connection
  - Active user tracking
  - Sending private messages
  - Clean-up on disconnect

### ✅ Server Configuration
- Socket initialized in `server.js` using `http.createServer(app)` and `new Server()` from Socket.IO.

---

## 💻 Frontend Additions (Angular)

### ✅ Chat Component
- File: `chat.component.ts`, HTML & CSS
- Features:
  - Displays online users
  - Chat box with message input
  - Message list updates in real time
  - Auto-fetches old messages

### ✅ Chat Service
- Handles all WebSocket events (`new user`, `private message`, `active users`) using `socket.io-client`.

---

## 📦 Folder Structure Changes

```
backend/
├── config/socket.js            # Socket logic
├── controllers/messageController.js
├── models/Message.js
├── router/messageRouter.js

frontend/
└── src/app/
    ├── components/chat/        # Chat component
    └── services/chat/          # Chat service
```

---

## ▶️ How to Run

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

Make sure your `.env` and MongoDB are properly configured.

---

## 🔌 Usage Demo

1. Login with two users (in different browsers/tabs).
2. Navigate to `/chat`.
3. Click on an active user to start chatting.
4. Type and send messages — you'll see them appear instantly.
5. Previous chat history auto-loads.

---

## 📌 Notes
- You must be **logged in** to access the chat.
- Messages persist even after refresh.
- Works across tabs and different browsers.

---

## 🙌 Author

Built by [Akhilan](https://github.com/Akhilan11) – Developer of Inkspire

