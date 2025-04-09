import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  standalone: true,
  template: `
    <header>
      <nav class="navbar">
        <div class="nav-links">
          <a [routerLink]="['/products']">Products</a>
          <a [routerLink]="['/cart']">Cart</a>
          <a [routerLink]="['/login']">Login</a>
          <a [routerLink]="['/user/register']">Register</a>
        </div>
        <img src="/assets/logo.png" alt="Company Logo" class="logo" />
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

}
