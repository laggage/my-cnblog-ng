import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { PostService } from '../../../core/services/post.service';
import { Posts } from '../../../models/post';
import { PaginationInfo } from '../../../models/pagination-info';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Posts = [];
  loadingPosts = false;
  loadPostsSuccessed = false;
  loadPostsFailed = false;
  loadPostsFailedMsg?: string;
  pageInfo: PaginationInfo = {
    pageIndex: 1,
    pageSize: 10,
  };

  private blogId?: number;

  constructor(
    route: ActivatedRoute,
    private notifyServ: NzNotificationService,
    private postServ: PostService,
    private userServ: UserService
  ) {
    route.paramMap.subscribe(o => {
      try {
        this.blogId = Number.parseInt(o.get('blogId'), null);
        this.loadPosts();
      } catch {
        notifyServ.error('路由参数加载失败', '');
      }
    });

    this.userServ.getUser();
  }

  private resetLoadingStatus() {
    this.loadingPosts = false;
    this.loadPostsFailed = false;
    this.loadPostsSuccessed = false;
    this.loadPostsFailedMsg = undefined;
  }

  private loadPosts() {
    this.resetLoadingStatus();
    this.loadingPosts = true;

    this.postServ.getPosts({
      pageIndex: this.pageInfo.pageIndex,
      pageSize: this.pageInfo.pageSize,
      blogId: this.blogId
    }).subscribe(o => {
      if (!(o instanceof HttpErrorResponse)) {
        this.postsLoadedSucceed(o.posts, o.paginationInfo);
      } else {
        this.notifyServ.error('Failed to load posts data, Please see log for detail', '');
      }
    });
  }

  postsLoadedSucceed(posts: Posts, paginationInfo: PaginationInfo) {
    this.posts = posts;
    this.pageInfo.totalItemsCount = paginationInfo.totalItemsCount;
    this.pageInfo.pageIndex = paginationInfo.pageIndex;
    this.pageInfo.pageSize = paginationInfo.pageSize;
    this.loadingPosts = false;
    this.loadPostsFailed = false;
    this.loadPostsSuccessed = true;
  }

  pageChanged(pageInfo: PaginationInfo) {
    this.pageInfo.pageIndex = pageInfo.pageIndex;
    this.pageInfo.pageSize = pageInfo.pageSize;
    this.loadPosts();
  }
}
