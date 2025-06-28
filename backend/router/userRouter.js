const express = require('express');
const { registerUser, loginUser, getProfile, getAllUsers } = require('../controller/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getProfile);
router.get('/users', getAllUsers); 

module.exports = router;
