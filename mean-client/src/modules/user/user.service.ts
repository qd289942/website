// src/modules/user/user.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  username: string;
  email: string;
}

@Injectable()
export class UserService {
  private currentUser: User | null = null;
  
  login(username: string, password: string): Observable<User> {
    // 模拟登录，实际中应调用后端 API
    this.currentUser = { username, email: username + '@example.com' };
    return of(this.currentUser);
  }
  register(username: string, email: string, password: string): Observable<User> {
    // 模拟注册
    this.currentUser = { username, email };
    return of(this.currentUser);
  }
  getUser(): Observable<User | null> {
    return of(this.currentUser);
  }
  logout(): void {
    this.currentUser = null;
  }
}
