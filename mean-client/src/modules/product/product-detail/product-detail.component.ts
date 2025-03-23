// src/modules/product/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  template: `
    <div *ngIf="product">
      <h2>{{product.name}}</h2>
      <img [src]="product.imageUrl" alt="{{product.name}}">
      <p>Price: {{product.price | currency}}</p>
      <p>{{product.description}}</p>
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
  `,
  styles: [`
    img { max-width: 100%; }
  `],
  imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  constructor(private route: ActivatedRoute, private productService: ProductService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => this.product = data);
  }
  addToCart(product: Product): void {
    // 此处调用购物车服务添加商品（需注入 CartService 进行实际操作）
    console.log('Add to Cart：', product);
  }
}
