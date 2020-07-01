import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { CommentService } from '../../../core/services/comment.service';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { isArray } from 'util';
import { PostComments, PostComment } from '../../../models/post-comment';
import { NzNotificationService } from 'ng-zorro-antd';
import { BlogService } from '../../../core/services/blog.service';
import { BlogLayoutComponent } from '../../../layout/blog-layout/blog-layout/blog-layout.component';
import { BlogLayoutService } from '../../../layout/blog-layout/services/blog-layout.service';
import { Blog } from '../../../models/blog';

@Component({
  selector: 'blog-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnChanges {
  @Input() postId: number;
  user: BlogUser;
  comments: PostComments = [];
  comment: string;
  blog: Blog;
  addCommenting = false;

  constructor(
    private commentServ: CommentService,
    private userServ: UserService,
    private notifyServ: NzNotificationService,
    private blogServ: BlogLayoutService
  ) {
    blogServ.blogSubject.subscribe(x => {
      if (x instanceof Blog) {
        this.blog = x;
      }
    });

    this.userServ.userSubject.subscribe(x => {
      if (x instanceof BlogUser) {
        this.user = x;
        blogServ.loadBlog(this.user.blog.id);
      } else {
        this.user = null;
      }
    });
    this.userServ.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (key === 'postId' && changes[key]) {
        // console.log(changes[key]);
        if (changes[key].currentValue && changes[key].currentValue !== changes[key].previousValue) {
          this.postId = Number(changes[key].currentValue);
          this.loadComments();
        }
      }
    }
  }

  addComment() {
    this.addCommenting = true;
    this.commentServ.addComment({
      repliedPostId: this.postId,
      comment: this.comment,
      repliededUserId: this.blog.blogger.id
    }).subscribe(x => {
      console.log(x);
      if (x instanceof PostComment) {
        x.user = this.user;
        this.comments = this.comments.concat(x);
        this.notifyServ.success('评论成功', '');
      }
      this.addCommenting = false;
    });
  }

  private loadComments() {
    this.commentServ.getComments({
      repliedPostId: this.postId
    }).subscribe(o => {
      if (isArray(o)) {
        this.comments = o as PostComments;
      }
    });
  }
}
