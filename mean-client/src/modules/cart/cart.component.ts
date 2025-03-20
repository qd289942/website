// src/modules/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  template: `
    <div>
      <h2>Cart</h2>
      <div *ngIf="cartProducts.length === 0">
        Your Cart is empty.
      </div>
      <div *ngFor="let product of cartProducts" class="cart-item">
        <img [src]="product.imageUrl" alt="{{product.name}}" width="50">
        {{product.name}} - {{product.price | currency}}
        <button (click)="removeProduct(product.id)">remove</button>
      </div>
      <button *ngIf="cartProducts.length > 0" (click)="checkout()">checkout</button>
    </div>
  `,
  styles: [`
    .cart-item { margin-bottom: 10px; }
  `]
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => this.cartProducts = data);
  }
  removeProduct(id: number): void {
    this.cartService.removeProduct(id);
  }
  checkout(): void {
    // 跳转到订单或支付页面
    console.log('Checkout');
    this.router.navigate(['/payment']);
  }
}
