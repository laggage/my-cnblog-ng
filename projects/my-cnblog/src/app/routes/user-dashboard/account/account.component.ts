import { Component, OnInit } from '@angular/core';
import { BlogUser } from '../../../models/blog-user';
import { UserService } from '../../../core/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  user: BlogUser;
  newAvatar: File;
  newAvatarUrl: any;

  constructor(
    private userServ: UserService,
    private notifyServ: NzNotificationService
  ) {
    userServ.userSubject.subscribe(x => {
      if (x instanceof BlogUser) {
        this.user = x;
      }
    });
    userServ.getUser();
  }

  avatarChanged(event) {
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      this.newAvatar = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.newAvatar);
      reader.onload = () => {
        this.newAvatarUrl = reader.result;
      };
      this.uploadAvatar(this.newAvatar);
    } else {
      this.newAvatar = null;
      this.newAvatarUrl = null;
    }
  }

  private uploadAvatar(file: File) {
    this.userServ.uploadAvatar(file).subscribe(
      x => {
        if (x.status === 204) {
          this.notifyServ.success('上传头像成功', '');
          this.userServ.getUser(true);
        } else {
          this.notifyServ.error('上传头像失败', `StatusCode: ${x.status}`);
          this.newAvatarUrl = null;
          this.newAvatar = null;
        }
      }
    );
  }
}
