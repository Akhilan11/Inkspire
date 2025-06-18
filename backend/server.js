const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

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


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
