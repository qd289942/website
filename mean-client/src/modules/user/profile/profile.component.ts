// src/modules/user/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  template: `
    <div>
      <h2>User Profile</h2>
      <div *ngIf="user">
        <p>Username：{{user.username}}</p>
        <p>Email{{user.email}}</p>
      </div>
      <div *ngIf="!user">
        <p>Please first login。</p>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe(data => this.user = data);
  }
}
