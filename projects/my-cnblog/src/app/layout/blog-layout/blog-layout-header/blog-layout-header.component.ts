import { Component, OnInit } from '@angular/core';
import { BlogLayoutService } from '../services/blog-layout.service';
import { Blog } from '../../../models/blog';

@Component({
  selector: 'blog-layout-header',
  templateUrl: './blog-layout-header.component.html',
  styleUrls: ['./blog-layout-header.component.css']
})
export class BlogLayoutHeaderComponent {
  blog: Blog;

  constructor(
    blogLayoutServ: BlogLayoutService
  ) {
    blogLayoutServ.blogSubject.subscribe(
      b => {
        if (b instanceof Blog) {
          this.blog = b;
        }
      }
    );
  }
}
