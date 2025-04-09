import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { Comment } from '../comment';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentSectionComponent } from '../comment-section-module/comment-section-module.component';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="product-detail-container" *ngIf="product">
      <!-- 图片区域 -->
      <div class="product-image">
        <img [src]="product.imageUrl" alt="{{ product.name }}" />
      </div>

      <!-- 商品信息区域 -->
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | currency }}</p>
        <p>{{ product.description }}</p>

        <!-- 动作按钮 -->
        <div class="actions">
          <button class="add-to-cart" (click)="addToCart(product)">Add to Cart</button>
          <button class="buy-now" (click)="buyNow(product)">Buy Now</button>
          <button class="view-comments" (click)="toggleComments()">
            {{ showComments ? 'Hide Comments' : 'View Comments' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 评论区域 -->

  <div class="comment-dialog" *ngIf="showCommentsDialog" (click)="onDialogBackgroundClick($event)">
    <div class="dialog-content" (click)="$event.stopPropagation()">
      <app-comment-section
        *ngIf="showCommentsDialog"
        [comments]="comments"
        [productId]="product!._id"
        (commentAdded)="onCommentAdded($event)"
        (commentDeleted)="onCommentDeleted($event)"
      ></app-comment-section>
      <button class="close-dialog" (click)="closeCommentsDialog()">Close</button>
    </div>
  </div>
  `,
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CommentSectionComponent],
})

export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  comments: Comment[] = [];
  newComment: Comment = { author: '', text: '', timestamp: new Date() }; // 新评论
  showComments: boolean = false; // 控制评论区显示
  showCommentsDialog: boolean = false; // 控制对话框显示

  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // 获取字符串类型的 id
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => (this.product = data),
        (error) => console.error('Failed to load product:', error)
      );
      this.productService.getComments(productId).subscribe(
        (data) => (this.comments = data),
        (error) => console.error('Failed to load comments:', error)
      );
    } else {
      console.error('Product ID is undefined');
    }
  }

  addToCart(product: Product): void {
    console.log('Add to Cart:', product);
  }

  buyNow(product: Product): void {
    console.log('Buy Now:', product);
  }

  toggleComments(): void {
    this.showCommentsDialog = !this.showCommentsDialog; // 打开对话框
  }

  closeCommentsDialog(): void {
    this.showCommentsDialog = false; // 关闭对话框
  }

  onDialogBackgroundClick(event: MouseEvent): void {
    this.closeCommentsDialog(); // 点击背景时关闭对话框
  }

  onCommentAdded(newComment: Comment): void {
    console.log('New comment added:', newComment);
    this.comments.push(newComment);
  }
  onCommentDeleted(deletedComment: Comment): void {
    console.log('Comment deleted:', deletedComment);
    this.comments = this.comments.filter(comment => comment._id !== deletedComment._id);
  }
}
