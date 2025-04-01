import { Component, Input, Output, EventEmitter } from '@angular/core';
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
      <p class="comment-author">{{ comment.author }}</p>
      <p class="comment-text">{{ comment.text }}</p>
      <p class="comment-timestamp">{{ comment.timestamp | date: 'mediumDate' }}</p>
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
  @Output() commentAdded = new EventEmitter<Comment>();
  newComment: string = '';

  addComment(): void {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        id: this.comments.length > 0 ? this.comments[this.comments.length - 1].id + 1 : 1,
        author: 'Anonymous',
        text: this.newComment,
        timestamp: new Date(),
      };
      this.commentAdded.emit(newComment);
      this.newComment = '';
    }
  }
}
