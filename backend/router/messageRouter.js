const express = require('express');
const router = express.Router();
const { getAllMessages, saveMessage } = require('../controller/messageController');

// Get chat between two users
router.get('/:user1/:user2', getAllMessages);

// Save new message
router.post('/', saveMessage);

module.exports = router;
