// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Standalone Component

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
