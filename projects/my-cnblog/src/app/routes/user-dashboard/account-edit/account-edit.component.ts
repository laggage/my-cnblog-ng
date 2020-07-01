import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent {
  user: BlogUser;
  defaultDate = new Date('2000-1-1');

  constructor(
    private userServ: UserService,
    private notifyServ: NzNotificationService,
    private router: Router
  ) {
    userServ.userSubject.subscribe(
      x => {
        if (x instanceof BlogUser) {
          this.user = x;
          if (!this.validDate(this.user.birth)) {
            this.user.birth = null;
          }
        }
      }
    );
    this.userServ.getUser();
  }

  updateUser() {
    this.userServ.updateUser(this.user.id, {
      userName: this.user.userName,
      email: this.user.email,
      birth: this.user.birth,
      sex: this.user.sex
    }).subscribe(
      x => {
        if (x.status === 204) {
          this.notifyServ.success('信息修改成功!', '');
          this.userServ.getUser(true);
          this.router.navigateByUrl('/userCenter/account');
        } else {
          this.notifyServ.error('信息修改失败!', '');
        }
      }
    );
  }

  validDate(date: Date) {
    return date && new Date(date).getFullYear() > 1970;
  }
}
