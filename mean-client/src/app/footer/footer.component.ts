import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <div class="footer-content">
        <p>© 2025 E-Commerce Company</p>
        <p class="current-date">{{ currentDate }}</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css'],
  standalone: true,
})
export class FooterComponent {
  currentDate: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }

}
