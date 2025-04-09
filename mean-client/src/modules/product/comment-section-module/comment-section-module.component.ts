import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Comment } from '../comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule],
  standalone: true,
  template: `
  <div class="product-comments">
    <h2>Customer Reviews</h2>
    <div *ngFor="let comment of comments" class="comment">
    <div>
      <p class="comment-author">{{ comment.author }}</p>
      <p class="comment-text">{{ comment.text }}</p>
      <p class="comment-timestamp">{{ comment.timestamp | date: 'mediumDate' }}</p>
    </div>
      <button (click)="deleteComment(productId, comment._id)">Delete</button>
    </div>

    <!-- 添加评论 -->
    <div class="add-comment">
      <textarea [(ngModel)]="newComment" placeholder="Write your comment..."></textarea>
      <button (click)="addComment()">Add Comment</button>
    </div>
  </div>
`,
  styleUrl: './comment-section-module.component.css'
})

export class CommentSectionComponent {
  @Input() comments: Comment[] = [];
  @Input() productId!: string; // 从父组件接收的产品 ID
  @Output() commentAdded = new EventEmitter<Comment>();
  @Output() commentDeleted = new EventEmitter<Comment>();
  newComment: string = '';


  productService: ProductService = inject(ProductService);

  addComment(): void {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        author: 'Anonymous',
        text: this.newComment,
        timestamp: new Date(),
      };
      this.productService.addComment(this.productId, newComment).subscribe(
        (comment) => {
        this.commentAdded.emit(comment); // Emit the new comment
        this.newComment = ''; // Clear the input field
      },
        (error) => {
          console.error('Failed to add comment:', error);
        }
      );
    }
  }

  deleteComment(productId: string | undefined, commentId: string | undefined): void {
    if (!productId) {
      console.error('Product ID is undefined. Cannot delete comment.');
      return;
    }

    if (!commentId) {
      console.error('Comment ID is undefined. Cannot delete comment.');
      return;
    }

    this.productService.deleteComment(productId, commentId).subscribe(
      (response) => {
        console.log(response.message);
        // 重新从服务器获取最新的评论列表
        const deletedComment = this.comments.find((comment) => comment._id === commentId);
        this.comments = this.comments.filter((comment) => comment._id !== commentId);
        if (deletedComment) {
          this.commentDeleted.emit(deletedComment); // Emit the deleted comment to the parent
        }
      },
      (error) => {
        console.error('Failed to delete comment:', error);
      }
    );


  }
}
