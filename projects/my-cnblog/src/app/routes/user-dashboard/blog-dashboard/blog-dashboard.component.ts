import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  user: BlogUser;
  constructor(
    private userServ: UserService
  ) {
    this.userServ.userObserver.subscribe(
      u => {
        if (u instanceof BlogUser) {
          this.user = u;
        }
      }
    );
    this.userServ.getUser();
  }

  ngOnInit(): void {
  }

}
