const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controller/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getProfile);

module.exports = router;
