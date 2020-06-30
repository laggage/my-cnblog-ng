import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { AuthService } from './Auth/auth.service';
import { UserService } from './services/user.service';
import { BlogService } from './services/blog.service';
import { CommentService } from './services/comment.service';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    UserService,
    BlogService,
    PostService,
    CommentService,
    CanDeactivateGuard
  ]
})
export class CoreModule { }
