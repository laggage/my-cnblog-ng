import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../core/services/post.service';
import { ConsoleLogger } from '../../../core/console-logger';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/Auth/auth.service';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  post: Post;
  confirmVisible = false;
  canDeactivateSub = new Subject<boolean>();
  canDeactivateDirectly = false;

  constructor(
    private postServ: PostService,
    private notifyServ: NzNotificationService,
    private modalServ: NzModalService,
    private router: Router,
    private userServ: UserService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  addPost(post: Post) {
    this.postServ.addPost(post).subscribe(
      x => {
        if (x instanceof Post) {
          this.onAddPostSucceed(x);
        } else {
          this.onAddPostFailed(x);
        }
      }
    );
  }

  navToMyBlog() {
    this.router.navigateByUrl(`/blog/${this.userServ.currentUser.blog.id}/posts`);
  }

  navToEditPost(postId: number) {
    this.router.navigateByUrl(`/userCenter/post/${postId}/modify`);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.canDeactivateDirectly) {
      return true;
    } else {
      this.confirmVisible = true;
      return this.canDeactivateSub.asObservable();
    }
  }

  handleCancel() {
    this.confirmVisible = false;
  }

  handleConfirm() {
    this.confirmVisible = false;
    this.canDeactivateSub.next(true);
    this.canDeactivateSub.complete();
  }

  private onAddPostFailed(errResponse: HttpResponseBase) {
    if (errResponse.status === 403) {
      this.authServ.to403Page();
    } else if (errResponse.status === 401) {
      this.authServ.to401Page();
    }
  }

  private onAddPostSucceed(post: Post) {
    this.notifyServ.success('操作成功', '');
    const modal = this.modalServ.create({
      nzIconType: 'success',
      nzContent: '博文创建成功!',
      nzFooter: [
        {
          label: '<<博文管理',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.canDeactivateDirectly = true;
            this.handleConfirm();
            this.router.navigateByUrl('userCenter/posts');
          }
        },
        {
          label: '继续编辑',
          onClick: () => {
            this.canDeactivateDirectly = true;
            modal.destroy();
            this.navToEditPost(post.id);
          }
        },
        {
          label: '我的博客',
          onClick: () => {
            this.canDeactivateDirectly = true;
            modal.destroy();
            this.navToMyBlog();
          }
        }
      ]
    });
  }
}
