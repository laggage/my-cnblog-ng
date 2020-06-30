import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../models/post';
import { NzNotificationService } from 'ng-zorro-antd';
import { BlogLayoutService } from '../../../layout/blog-layout/services/blog-layout.service';
import { CommentService } from '../../../core/services/comment.service';
import { PostComment, PostComments } from '../../../models/post-comment';
import { isArray } from 'util';

@Component({
  selector: 'blog-post-read',
  templateUrl: './post-read.component.html',
  styleUrls: ['./post-read.component.css']
})
export class PostReadComponent implements OnInit {
  post: Post;
  failedLoadPost = false;
  postContent?: string;
  failedMsg = '';
  private fromApp = false;
  private postId?: number;

  constructor(
    private postServ: PostService,
    private notifyServ: NzNotificationService,
    private route: ActivatedRoute,
    private blogLayoutServ: BlogLayoutService,
  ) {
    // 用户可能从本网页内导航到这里, 也可能直接输入链接导航到这里, 所以判断一下
    // 从本应用内导航到这里, 很快就会拿到 post 数据, 而直接输入链接导航到此处, 不会收到 Post 数据
    // 所以要从服务器获取

    this.route.paramMap.subscribe(x => {
      this.postId = Number.parseInt(x.get('postId'), null);
    });

    setTimeout(() => {
      if (this.fromApp && !this.post) {
        this.loadPost();
      }
    }, 1000);

    this.postServ.selectedPostObserver.subscribe(x => {
      if (x) {
        this.post = x;
        this.loadPostContent();
      } else {
        this.failedLoadPost = true;
      }
    });
    // 如果从本应用网页中导航此组件, 这个订阅会受到 post 数据
    this.route.queryParamMap.subscribe(x => {
      this.fromApp = JSON.parse(x.get('fromApp'));
      if (!this.fromApp) {
        if (this.postId) {
          this.loadPost();
        } else {
          this.failedLoadPost = true;
          this.failedMsg = 'Cannot get param from route';
        }
      }
    });
  }

  ngOnInit(): void {
  }

  private loadPost() {
    this.postServ.getPostById(this.postId).subscribe(
      p => {
        if (p instanceof Post) {
          this.post = p;
          this.loadPostContent();
          this.blogLayoutServ.loadBlog(p.blog.blogger.id);
        } else {
          this.failedLoadPost = true;
        }
      }
    );
  }

  private loadPostContent() {
    this.postServ.getPostContent(this.post.postContentUrl).subscribe(
      content => {
        console.log(content);
        if (typeof content === 'string') {
          this.postContent = content;
        } else {
          this.notifyServ.error('加载博文失败', '');
        }
      }
    );
  }
}
