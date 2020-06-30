import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { NzNotificationService } from 'ng-zorro-antd';
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
    private notifyServ: NzNotificationService,
    private router: Router
  ) {
    this.userServ.userObserver.subscribe(x => {
     if (x instanceof BlogUser) {
      this.user = x;
     } else if (!x) {
      this.router.navigateByUrl('app/index');
     }
    });
    this.userServ.getUser();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authServ.logout();
    this.userServ.getUser();
  }
}
