import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostReadComponent } from './post-read/post-read.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from '../../shared/shared.module';
import { PostCommentComponent } from './post-comment/post-comment.component';



@NgModule({
  declarations: [PostReadComponent, PostsComponent, PostCommentComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class BlogModule { }
