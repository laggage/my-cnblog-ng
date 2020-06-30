import { Component, OnInit } from '@angular/core';
import { Posts, Post } from '../../../models/post';
import { PostService } from '../../../core/services/post.service';
import { PaginationInfo } from '../../../models/pagination-info';
import { BlogUser } from '../../../models/blog-user';
import { UserService } from '../../../core/services/user.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { AuthService } from '../../../core/Auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Posts = [];
  pageInfo: PaginationInfo = new PaginationInfo();
  user: BlogUser;
  isloading = false;

  constructor(
    private postserv: PostService,
    private userServ: UserService,
    private router: Router,
    private modalServ: NzModalService,
    private authServ: AuthService
  ) {
    this.user = userServ.currentUser;
    if (!this.user) {
      this.userServ.getUser();
      this.userServ.userObserver.subscribe(x => {
        if (x instanceof BlogUser) {
          this.user = x;
          this.loadPosts();
        } else {
          this.authServ.to401Page();
        }
      });
    } else {
      this.loadPosts();
    }
  }

  ngOnInit(): void {
  }


  async editPost(post: Post) {
    await this.router.navigateByUrl('userCenter/post/modify');
    this.postserv.selectedPostSubject.next(post);
  }

  confirmDelete(post: Post) {
    this.modalServ.confirm({
      nzContent: '确定要删除嘛?',
      nzTitle: '危险操作',
      nzOnOk: () => {
        this.deletePost(post);
      },
    });
  }

  gotoPostRead(post: Post) {
    this.router.navigateByUrl(`blog/${post.blog.id}/posts/${post.id}`);
  }

  private deletePost(post: Post) {
    this.postserv.deletePost(post.id).subscribe(
      x => {
        if (!(x instanceof HttpErrorResponse)) {
          this.deletePostSucceed(post);
        }
      }
    );
  }

  private deletePostSucceed(post: Post) {
    this.posts.splice(this.posts.findIndex(p => p.id === post.id), 1);
  }

  private loadPosts() {
    this.isloading = true;
    this.postserv.getPosts({
      userId: this.user.id,
      pageIndex: this.pageInfo.pageIndex,
      pageSize: this.pageInfo.pageSize
    }).subscribe(x => {
      if (!(x instanceof HttpErrorResponse)) {
        this.posts = x.posts;
        this.onPostsLoaed(x.posts, x.paginationInfo);
      }
    });
  }

  private onPostsLoaed(posts: Posts, paginationInfo: PaginationInfo) {
    this.posts .push(...posts);
    this.pageInfo.totalItemsCount = paginationInfo.totalItemsCount;
    this.pageInfo.pageCount = paginationInfo.pageCount;
    this.isloading = false;
  }
}
