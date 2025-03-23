// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './shared/header/header.component';  // Standalone Component
import { FooterComponent } from './shared/footer/footer.component';  // Standalone Component

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HeaderComponent,  // Import Standalone Components
    FooterComponent   // Import Standalone Components
  ]
})
export class AppModule { }
