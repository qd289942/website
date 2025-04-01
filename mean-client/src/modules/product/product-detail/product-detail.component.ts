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
        (commentAdded)="onCommentAdded($event)"
      ></app-comment-section>
      <button class="close-dialog" (click)="closeCommentsDialog()">Close</button>
    </div>
  </div>

    <app-comment-section
      *ngIf="showComments"
      [comments]="comments"
      (commentAdded)="onCommentAdded($event)"
    ></app-comment-section>
  `,
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CommentSectionComponent],
})

export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  comments: Comment[] = [];
  showComments: boolean = false; // 控制评论区显示
  showCommentsDialog: boolean = false; // 控制对话框显示
  // selectedFilter: string = 'all'; // 当前选中的过滤器

  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => (this.product = data));
    this.productService.getComments().subscribe(data => (this.comments = data));
  }

  addToCart(product: Product): void {
    console.log('Add to Cart:', product);
  }

  buyNow(product: Product): void {
    console.log('Buy Now:', product);
  }

  toggleComments(): void {
    this.showCommentsDialog = true; // 打开对话框
  }

  closeCommentsDialog(): void {
    this.showCommentsDialog = false; // 关闭对话框
  }

  onDialogBackgroundClick(event: MouseEvent): void {
    this.closeCommentsDialog(); // 点击背景时关闭对话框
  }

  onCommentAdded(newComment: Comment): void {
    this.comments.push(newComment);
  }
  /*filteredComments(): Comment[] {
    if (this.selectedFilter === 'recent') {
      return [...this.comments].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else if (this.selectedFilter === 'oldest') {
      return [...this.comments].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    return this.comments; // 默认显示所有评论
  }*/
}
