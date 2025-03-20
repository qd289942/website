// src/modules/order/order.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: number;
  products: any[];
  total: number;
  status: string;
}

@Injectable()
export class OrderService {
  private orders: Order[] = [
    { id: 1, products: [], total: 300, status: 'To be paid' }
  ];
  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }
  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
  }
  createOrder(order: Order): Observable<Order> {
    order.id = this.orders.length + 1;
    this.orders.push(order);
    return of(order);
  }
}
