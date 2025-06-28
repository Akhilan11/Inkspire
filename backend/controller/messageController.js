const Message = require('../model/message')

const getAllMessages = async (req,res) => {
    const { user1,user2 } = req.params
    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }) 
        .sort({ createdAt: 1 })
        .populate('sender', 'username')
        .populate('receiver', 'username');
        res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// POST a new message
const saveMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllMessages, saveMessage };