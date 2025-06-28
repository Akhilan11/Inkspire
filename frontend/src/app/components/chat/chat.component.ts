import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { UserService } from '../../services/auth/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = '';
  messages: { sender: string; message: string }[] = [];
  selectedUser: any = null;

  username = localStorage.getItem('username') || '';
  userId = localStorage.getItem('userId') || '';
  allUsers: any[] = [];

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    this.chatService.join(this.username);

    this.chatService.receiveMessage((data) => {
      if (this.selectedUser && data.sender === this.selectedUser.username) {
        this.messages.push({ sender: data.sender, message: data.message });
      }
    });

    this.userService.getAllUsers().subscribe({
      next: (users: any) => {
        this.allUsers = users.filter((u: any) => u.username !== this.username);
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }

  setReceiver(userObj: any) {
    this.selectedUser = userObj;
    const senderId = this.userId;
    const receiverId = userObj._id;

    this.chatService.getMessageHistory(senderId, receiverId).subscribe({
      next: (msgs) => {
        this.messages = msgs.map(msg => {
          let senderName = '';

          if (typeof msg.sender === 'object' && msg.sender._id) {
            senderName = msg.sender._id === this.userId ? 'You' : msg.sender.username;
          } else {
            senderName = msg.sender === this.userId ? 'You' : this.getUsernameById(msg.sender);
          }

          return {
            sender: senderName,
            message: msg.message
          };
        });
      },
      error: (err) => {
        console.error('❌ Failed to load chat history:', err);
      }
    });
  }

  getUsernameById(id: string): string {
    const user = this.allUsers.find(u => u._id === id);
    return user ? user.username : 'Unknown';
  }

  sendMessage() {
    if (!this.selectedUser || !this.message.trim()) return;

    const data = {
      sender: this.userId,
      receiver: this.selectedUser._id,
      message: this.message.trim()
    };

    this.chatService.storeMessage(data).subscribe({
      next: () => {
        this.messages.push({ sender: 'You', message: this.message });

        this.chatService.sendMessageViaSocket({
          sender: this.username,
          receiver: this.selectedUser.username,
          message: this.message
        });

        this.message = '';
      },
      error: (err) => {
        console.error('❌ Failed to store message:', err);
      }
    });
  }
}
