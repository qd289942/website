// src/modules/order/order.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderService } from './order.service';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: ':id', component: OrderDetailComponent }
];

@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [OrderService]
})
export class OrderModule { }
