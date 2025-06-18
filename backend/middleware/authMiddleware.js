const jwt = require('jsonwebtoken');
const User = require('../model/user');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user (without password)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: "User not found." });

    req.user = user;  // ✅ attaches full user doc to req
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect }; 
