// src/modules/user/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()">
        <label>
          Username:
          <input type="text" [(ngModel)]="username" name="username" required>
        </label>
        <br>
        <label>
          Password:
          <input type="password" [(ngModel)]="password" name="password" required>
        </label>
        <br>
        <button type="submit">Login</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private userService: UserService, private router: Router) {}
  onLogin(): void {
    this.userService.login(this.username, this.password).subscribe(user => {
      console.log('User:', user);
      this.router.navigate(['/user/profile']);
    });
  }
}
