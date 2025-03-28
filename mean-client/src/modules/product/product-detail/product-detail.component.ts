import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
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
  styleUrls: [`./product-detail.component.css`],
  standalone: true,
  imports: [CommonModule],
})

export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => this.product = data);
  }
  addToCart(product: Product): void {
    // 此处调用购物车服务添加商品（需注入 CartService 进行实际操作）
    console.log('Add to Cart：', product);
  }
}
