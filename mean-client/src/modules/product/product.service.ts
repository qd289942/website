// src/modules/product/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';


@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'product 1', price: 100, imageUrl: 'assets/product_1.jpeg', description: 'This is the first product.' },
    { id: 2, name: 'product 2', price: 200, imageUrl: 'assets/product_2.jpeg', description: 'This is the second product.' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
