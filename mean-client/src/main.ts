import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import routeConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(routeConfig),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }, // Set default currency code
    provideHttpClient(),
  ]
  }
)
  .catch(err => console.error(err));
