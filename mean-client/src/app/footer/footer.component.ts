import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <p>&copy; 2025 E-Commerce Company</p>
    </footer>
  `,
  styles: [`
    footer { background: #f8f8f8; text-align: center; padding: 10px; position: fixed; bottom: 0; width: 100%; }
  `]
})
export class FooterComponent {

}
