import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-layout',
  templateUrl: './user-dashboard-layout.component.html',
  styleUrls: ['./user-dashboard-layout.component.css']
})
export class UserDashboardLayoutComponent implements OnInit {
  user: BlogUser;
  constructor(
    private authServ: AuthService,
    private userServ: UserService,
    private router: Router,
    private modalServ: NzModalService,
  ) {
    this.userServ.userObserver.subscribe(x => {
     if (x instanceof BlogUser) {
       if (this.user) {
         this.user = null;
         setTimeout(() => {
          this.user = x;
         }, 10);
       } else {
        this.user = x;
       }
     } else if (!x) {
      this.router.navigateByUrl('app/index');
     }
    });
    this.userServ.getUser();
  }

  ngOnInit(): void {
  }

  logout() {
    this.modalServ.confirm({
      nzTitle: '确认操作',
      nzContent: '确定要登出嘛?',
      nzOnOk: () => {
        this.authServ.logout();
        this.userServ.getUser();
      }
    });
  }
}
