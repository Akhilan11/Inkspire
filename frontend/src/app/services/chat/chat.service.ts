import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:5000'; // backend URL

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  // Socket.io Real-time Messaging
  sendMessageViaSocket(data: { sender: string; receiver: string; message: string }) {
    this.socket.emit('private message', data);
  }

  receiveMessage(callback: (data: any) => void) {
    this.socket.on('private message', callback);
  }

  // User connection
  join(username: string) {
    this.socket.emit('new user', username);
  }

  getActiveUsers(callback: (users: any[]) => void) {
    this.socket.on('active users', callback);
  }

  // Typing indicators (optional)
  emitTyping(data: string) {
    this.socket.emit('typing', data);
  }

  listenTyping(callback: (data: string) => void) {
    this.socket.on('display', callback);
  }

  // Disconnect socket
  disconnect() {
    this.socket.disconnect();
  }

  // HTTP APIs to store/retrieve chat history
  getMessageHistory(senderId: string, receiverId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/messages/${senderId}/${receiverId}`);
  }

  storeMessage(data: { sender: string; receiver: string; message: string }): Observable<any> {
    return this.http.post(`${this.url}/api/messages`, data);
  }
}
