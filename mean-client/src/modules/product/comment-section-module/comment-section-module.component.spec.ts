import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectionModuleComponent } from './comment-section-module.component';

describe('CommentSectionModuleComponent', () => {
  let component: CommentSectionModuleComponent;
  let fixture: ComponentFixture<CommentSectionModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSectionModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentSectionModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
