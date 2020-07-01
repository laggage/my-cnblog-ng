import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../core/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { ConsoleLogger } from '../../../core/console-logger';
import { AuthService } from '../../../core/Auth/auth.service';
import { toHttpPatchOperations } from '../../../models/base-model';
import { HttpResponseBase } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PageRefreshMonitorService } from '../../../core/services/page-refresh-monitor.service';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.css']
})
export class ModifyPostComponent implements OnInit {
  post: Post;
  postId: number;

  failedLoadPost = false;
  loadingPost = true;

  updating = false;
  updateFailed = false;
  updataFailedMsg = '';
  canDeactivate$ = new Subject<boolean>();

  constructor(
    private postServ: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyServ: NzNotificationService,
    private modalServ: NzModalService,
    private authServ: AuthService,
    private refreshMonitor: PageRefreshMonitorService
  ) {
    // 可以指定 postId 路由到本组件, 或者不加PostId, 通过PostService传递Post数据到本组件
    this.route.paramMap.subscribe(x => {
      this.postId = Number.parseInt(x.get('postId'), null);
      if (this.postId) {
        this.loadPostFromNet();
      } else { // 一定时间内既没有接收到Post数据, 也没有拿到PostId, 那么就去404
        setTimeout(() => {
          if (!this.postId && !this.post) {
            this.loadPostFailed();
            this.canDeactivateDelegate = () => true;
            this.router.navigateByUrl('404');
          }
        }, 1000);
      }
    });

    const subscriber = postServ.selectedPostSubject.subscribe(p => {
      if (p) {
        this.loadPostSuccess(p);
      } else {
        this.loadPostFailed();
      }
      subscriber.unsubscribe();
    });
    // 页面刷新, 页面如果被刷新, 那么就从本地存储读出postId, 提高刷新体验
    if (this.refreshMonitor.isPageRefreshed() === true) {
      this.postId = this.refreshMonitor.getData('postId');
      subscriber.unsubscribe();
      this.loadPostFromNet();
    }
  }

  ngOnInit(): void {
  }

  private loadPostFromNet() {
    if (!this.postId) {
      this.loadPostFailed();
    }
    this.postServ.getPostById(this.postId).subscribe(o => {
      if (o instanceof Post) {
        this.loadPostSuccess(o);
      } else {
        this.loadPostFailed();
      }
      ConsoleLogger.log(ModifyPostComponent, this.post);
    });
  }

  loadPostSuccess(post: Post) {
    this.post = post;
    this.failedLoadPost = false;
    this.loadingPost = false;
    this.loadPostContent();
    this.refreshMonitor.appendData('postId', this.post.id); // 关闭页面时, 保存当前博文id到本地存储
  }

  loadPostFailed() {
    this.notifyServ.error(`加载博文失败, 博文id: ${this.postId}`, '');
    this.failedLoadPost = true;
    this.loadingPost = false;
  }

  loadPostContent() {
    this.postServ.getPostContent(this.post.postContentUrl).subscribe(
      x => {
        if (typeof x === 'string') {
          const p = this.post;
          p.content = x;
          this.post = null;
          setTimeout(() => {  // 更新PostEditor, 等待angular执行脏检查
            this.post = p;
          }, 200);
        }
      }
    );
  }

  updatePost(post: Post) {
    this.beginUpdate();
    const operations = toHttpPatchOperations(
      post.assignToAddDto()
    );
    this.postServ.updatePost(this.post.id, operations).subscribe(x => {
      if (x.status < 300 && x.status >= 200) {
        this.onUpdateSuccessed();
      } else {
        this.onUpdateFailed(x);
      }
      this.updating = false;
    });
  }

  beginUpdate() {
    this.updateFailed = false;
    this.updating = true;
  }

  canDeactivateDelegate: () => Observable<boolean> | boolean = () => {
    this.canDeactivate$.next(false);
    this.modalServ.confirm({
      nzTitle: '操作确认',
      nzContent: '确定要离开编辑页面嘛',
      nzOnOk: () => {
        this.canDeactivate$.next(true);
        this.canDeactivate$.complete();
      },
      nzOnCancel: () => {
        this.canDeactivate$.next(false);
        this.canDeactivate$.complete();
      }
    });
    return this.canDeactivate$.asObservable();
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.canDeactivateDelegate();
  }

  private onUpdateSuccessed() {
    this.updateFailed = false;
    this.notifyServ.success('修改成功', `更新${this.post.title}成功`);
  }

  private onUpdateFailed(response: HttpResponseBase) {
    this.updateFailed = true;
    this.updataFailedMsg = 'Failed to upload data' + `statusCode: ${response.status}, statusText: ${response.statusText}`;
    this.notifyServ.error(this.updataFailedMsg, '');
  }
}
