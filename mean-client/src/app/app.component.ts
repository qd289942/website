// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';  // Standalone Component
import { FooterComponent } from './shared/footer/footer.component';  // Standalone Component

@Component({
  selector: 'app-root',
  standalone: true,  // Marking this as a standalone component
  imports: [AppRoutingModule, RouterOutlet, HeaderComponent, FooterComponent, BrowserModule],  // Import Standalone components
  template: `
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .content { padding: 20px; margin-top: 60px; }
  `]
})
export class AppComponent { }
