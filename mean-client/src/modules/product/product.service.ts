// src/modules/product/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'product 1', price: 100, imageUrl: 'assets/product1.jpg', description: '' },
    { id: 2, name: 'product 2', price: 200, imageUrl: 'assets/product2.jpg', description: '' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
