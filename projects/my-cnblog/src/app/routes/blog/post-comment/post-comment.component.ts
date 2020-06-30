import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { CommentService } from '../../../core/services/comment.service';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { isArray } from 'util';
import { PostComments } from '../../../models/post-comment';

@Component({
  selector: 'blog-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input() postId: number;
  user: BlogUser;
  comments: PostComments = [];

  constructor(
    authServ: AuthService,
    private commentServ: CommentService,
    userServ: UserService
  ) {
    userServ.userObserver.subscribe(x => {
      if (x instanceof BlogUser) {
        this.user = x;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (key === 'postId' && changes[key]) {
        console.log(changes[key]);
        if (changes[key].currentValue && changes[key].currentValue !== changes[key].previousValue) {
          this.postId = Number(changes[key].currentValue);
          this.loadComments();
        }
      }
    }
  }

  ngOnInit(): void {
  }

  private loadComments() {
    this.commentServ.getComments({
      repliedPostId: this.postId
    }).subscribe(o => {
      if (isArray(o)) {
        this.comments = o as PostComments;
      } else { }
    });
  }
}
