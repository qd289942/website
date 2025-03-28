// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Marking this as a standalone component
  imports: [RouterModule, HeaderComponent, FooterComponent],  // Import Standalone components
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-client';
}
