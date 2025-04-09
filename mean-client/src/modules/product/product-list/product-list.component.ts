import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  template: `
    <div *ngIf="products.length === 0" class="empty-state">
      No products available.
    </div>
    <div class="product-list" *ngIf="products.length > 0">
      <div *ngFor="let product of products" class="product-card" (click)="goToDetail(product._id)">
        <img [src]="product.imageUrl" alt="{{product.name}}">
        <h3>{{product.name}}</h3>
        <p>price：{{product.price | currency}}</p>
        <p>{{product.description}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule], 
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productService: ProductService = inject(ProductService);
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }
  goToDetail(productId: string | undefined) {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }
}
