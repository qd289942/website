// src/modules/cart/cart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './cart.service';

const routes: Routes = [
  { path: '', component: CartComponent }
];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [CartService]
})
export class CartModule { }
