// src/modules/order/order-detail/order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService, Order } from '../order.service';

@Component({
  selector: 'app-order-detail',
  template: `
    <div *ngIf="order">
      <h2>Order: #{{order.id}}</h2>
      <p>Price：{{order.total | currency}}</p>
      <p>Status：{{order.status}}</p>
    </div>
  `
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;
  constructor(private route: ActivatedRoute, private orderService: OrderService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe(data => this.order = data);
  }
}
