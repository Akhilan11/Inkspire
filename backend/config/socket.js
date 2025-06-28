const users = new Map(); 
const usernameToSocket = new Map(); 

const connectSocket = (io) => {
  io.on('connection', (socket) => {

    console.log('🔌 A user connected:', socket.id);

    // 🔐 User registers their username on connect
    socket.on('new user', (username) => {
      users.set(socket.id, username);
      usernameToSocket.set(username, socket.id);
      console.log(`✅ ${username} connected with socket ID: ${socket.id}`);
      
      // Broadcast active users list
      io.emit('active users', Array.from(usernameToSocket.keys()));
    });

    // 📩 Private message
    socket.on('private message', (data) => {
      const { sender, receiver, message } = data;
      const receiverSocketId = usernameToSocket.get(receiver);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('private message', {
          sender,
          message
        });
        console.log(`📤 ${sender} ➡️ ${receiver}: ${message}`);
      } else {
        console.log(`❌ ${receiver} is not online.`);
      }
    });

    // ✍️ Typing indicator
    socket.on('typing', (data) => {
      const { receiver, sender } = data;
      const receiverSocketId = usernameToSocket.get(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', { sender });
      }
    });

    // ❌ Disconnect
    socket.on('disconnect', () => {
      const username = users.get(socket.id);
      console.log(`❌ ${username || 'Unknown'} disconnected`);

      if (username) {
        users.delete(socket.id);
        usernameToSocket.delete(username);
        io.emit('active users', Array.from(usernameToSocket.keys()));
      }
    });
  });
};

module.exports = connectSocket;
