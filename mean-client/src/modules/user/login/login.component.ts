import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()" #loginForm="ngForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            [(ngModel)]="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="password"
            required
          />
        </div>
        <button type="submit" [disabled]="!loginForm.valid">Login</button>
      </form>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    const loginData = { username: this.username, password: this.password };

    this.http.post<{ token: string }>('http://localhost:3000/api/login', loginData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // 存储 JWT
        console.log('Login successful');
        console.log('Token:', response.token);
        this.router.navigate(['/products']); // 登录成功后跳转到产品页面
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed:', error);
      }
    );
  }
}
