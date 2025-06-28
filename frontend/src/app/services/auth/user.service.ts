import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.authUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !! localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getProfile() : Observable<any>{
    return this.http.get(`${this.authUrl}/user`);
  }

  getAllUsers() {
    return this.http.get<any[]>('http://localhost:5000/api/auth/users');
  }

}
