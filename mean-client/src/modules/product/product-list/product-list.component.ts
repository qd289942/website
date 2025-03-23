// src/modules/product/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <div *ngFor="let product of products" class="product-card" (click)="goToDetail(product.id)">
        <img [src]="product.imageUrl" alt="{{product.name}}">
        <h3>{{product.name}}</h3>
        <p>price：{{product.price | currency}}</p>
        <p>{{product.description}}</p>
      </div>
    </div>
  `,
  styles: [`
    .product-list { display: flex; flex-wrap: wrap; gap: 16px; }
    .product-card { border: 1px solid #ccc; padding: 16px; cursor: pointer; width: 200px; }
    .product-card img { width: 100%; height: auto; }
  `],
  standalone: true,
  imports: [CommonModule], 
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }
  goToDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
