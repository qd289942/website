// src/modules/product/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, } from './product';
import { Comment } from './comment';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root', // This service is provided in the root injector
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // 获取带有 JWT 的请求头
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 JWT
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // 添加 Authorization 头
    });
  }
  
  // Fetch products from the API
  getProducts(): Observable<Product[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers});
  }

  getProductById(id: string): Observable<Product | undefined> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

   // 获取特定产品的评论
  getComments(productId: string): Observable<Comment[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Comment[]>(`${this.apiUrl}/${productId}/comments`, { headers });
  }

  // 添加评论到特定产品
  addComment(productId: string, comment: Comment): Observable<Comment> {
    const headers = this.getAuthHeaders();
    return this.http.post<Comment>(`${this.apiUrl}/${productId}/comments`, comment, { headers });
  }

  deleteComment(productId: string, commentId: string): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${productId}/comments/${commentId}`, { headers });
  }

}
