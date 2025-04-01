// src/modules/product/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, } from './product';
import { Comment } from './comment';


@Injectable({
  providedIn: 'root', // This service is provided in the root injector
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'product 1', price: 100, imageUrl: '/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg', description: 'This is the first product.' },
    { id: 2, name: 'product 2', price: 200, imageUrl: '/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg', description: 'This is the second product.' }
  ];

  private comments: Comment[] = [
    { id: 1, author: 'John Doe', text: 'Great product! Highly recommend it.', timestamp: new Date() },
    { id: 2, author: 'Jane Smith', text: 'Good quality, but a bit expensive.', timestamp: new Date() },
    { id: 3, author: 'Alice Johnson', text: 'Fast delivery and excellent customer service.', timestamp: new Date() },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getComments(): Observable<Comment[]> {
    return of(this.comments);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
