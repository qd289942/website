// src/modules/order/order-list/order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  template: `
    <div>
      <h2>My Order</h2>
      <div *ngFor="let order of orders" (click)="viewOrder(order.id)" class="order-item">
        <p>Order #{{order.id}} - Total Price：{{order.total | currency}} - Status：{{order.status}}</p>
      </div>
    </div>
  `,
  styles: [`
    .order-item { cursor: pointer; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => this.orders = data);
  }
  viewOrder(id: number): void {
    this.router.navigate(['/orders', id]);
  }
}
