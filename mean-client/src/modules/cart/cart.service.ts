// src/modules/cart/cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../product/product.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private cart: Product[] = [];
  private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.cart);

  addProduct(product: Product): void {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
  }
  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }
  removeProduct(productId: number): void {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.cartSubject.next(this.cart);
  }
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}
