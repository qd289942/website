import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <nav>
        <a [routerLink]="['/products']">Products</a>
        <a [routerLink]="['/cart']">Cart</a>
        <a [routerLink]="['/user/login']">Login</a>
        <a [routerLink]="['/user/register']">Register</a>
      </nav>
    </header>
  `,
  styles: [`
    header { background: #333; color: #fff; padding: 10px; }
    nav a { color: #fff; margin-right: 15px; text-decoration: none; }
  `]
})
export class HeaderComponent {

}
