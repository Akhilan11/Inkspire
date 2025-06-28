const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const http = require('http'); 
const { Server } = require('socket.io');
const connectSocket = require('./config/socket');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
const connectDB = require('./config/db');
connectDB();

// Routes
const blogRoutes = require('./router/blogRouter');
app.use('/api/posts', blogRoutes);
const userRoutes = require('./router/userRouter');
app.use('/api/auth', userRoutes);
const messageRoutes = require('./router/messageRouter');
app.use('/api/messages', messageRoutes);

// Create HTTP server manually (to attach Socket.IO)
const server = http.createServer(app);

// Create Socket.IO server and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

// Socket.IO logic
connectSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
