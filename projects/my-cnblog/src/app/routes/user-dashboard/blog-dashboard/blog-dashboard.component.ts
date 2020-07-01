import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../models/blog';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent {
  user: BlogUser;
  constructor(
    private userServ: UserService,
    private blogServ: BlogService
  ) {
    this.userServ.userSubject.subscribe(
      u => {
        if (u instanceof BlogUser) {
          this.user = u;
          this.loadBlog();
        }
      }
    );
    this.userServ.getUser();
  }

  private loadBlog() {
    this.blogServ.getById(this.user.blog.id).subscribe(x => {
      if (x instanceof Blog) {
        this.user.blog = x;
      }
    });
  }
}
