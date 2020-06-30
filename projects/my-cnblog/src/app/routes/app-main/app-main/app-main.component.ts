import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { Posts, Post } from '../../../models/post';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogUser } from '../../../models/blog-user';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { PaginationInfo } from '../../../models/pagination-info';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {
  posts: Posts;
  paginationInfo: PaginationInfo = new PaginationInfo();

  constructor(
    private postServ: PostService
  ) {
  }

  getPosts(pageIndex?: number, pageSize?: number) {
    this.postServ.getPosts({ pageIndex, pageSize }).subscribe(
      x => {
        if (x instanceof HttpErrorResponse) {
          console.log('Failed to load posts', x.error);
        } else {
          this.posts = x.posts;
          this.paginationInfo = x.paginationInfo;
          if (!environment.production) {
            console.log(this.paginationInfo);
            console.log(this.posts);
            console.log(this.posts[0].author);
          }
        }
      }
    );
  }

  ngOnInit(): void {
  }

  onPageChanged(pageInfo: PaginationInfo) {
    this.getPosts(pageInfo.pageIndex, pageInfo.pageSize);
  }
}
