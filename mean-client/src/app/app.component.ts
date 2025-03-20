// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .content { margin: 60px 20px; }
  `]
})
export class AppComponent { }
