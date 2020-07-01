import { Component, OnInit } from '@angular/core';
import { BlogLayoutService } from '../services/blog-layout.service';
import { Blog } from '../../../models/blog';
import { BlogUser } from '../../../models/blog-user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'blog-layout-header',
  templateUrl: './blog-layout-header.component.html',
  styleUrls: ['./blog-layout-header.component.css']
})
export class BlogLayoutHeaderComponent {
  blog: Blog;
  user: BlogUser;

  constructor(
    blogLayoutServ: BlogLayoutService,
    userServ: UserService
  ) {
    blogLayoutServ.blogSubject.subscribe(
      b => {
        if (b instanceof Blog) {
          this.blog = b;
        }
      }
    );
    userServ.userSubject.subscribe(x => {
      if (x instanceof BlogUser) {
        this.user = x;
      }
    });
    userServ.getUser();
  }
}
