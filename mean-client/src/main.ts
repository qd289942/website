import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(routeConfig),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' } // Set default currency code
  ]
  }
)
  .catch(err => console.error(err));
