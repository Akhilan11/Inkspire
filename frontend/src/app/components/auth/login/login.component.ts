import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    const data = { email: this.email, password: this.password };
    this.userService.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('username', res.user.username)
        localStorage.setItem('userId', res.user.id)
        // console.log(res)
        this.router.navigate(['/']);
      },
      error: (err : any) => {
        this.errorMsg = err.error.error || 'Login failed';
      }
    });
  }

}
