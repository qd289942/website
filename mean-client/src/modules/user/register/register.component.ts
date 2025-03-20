// src/modules/user/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  template: `
    <div>
      <h2>Register</h2>
      <form (ngSubmit)="onRegister()">
        <label>
          User name:
          <input type="text" [(ngModel)]="username" name="username" required>
        </label>
        <br>
        <label>
          Email:
          <input type="email" [(ngModel)]="email" name="email" required>
        </label>
        <br>
        <label>
          Password:
          <input type="password" [(ngModel)]="password" name="password" required>
        </label>
        <br>
        <button type="submit">Regist</button>
      </form>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  constructor(private userService: UserService, private router: Router) {}
  onRegister(): void {
    this.userService.register(this.username, this.email, this.password).subscribe(user => {
      console.log('Registed user:', user);
      this.router.navigate(['/user/profile']);
    });
  }
}
