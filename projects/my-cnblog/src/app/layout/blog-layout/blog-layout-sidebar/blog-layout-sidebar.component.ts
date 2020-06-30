import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../core/services/blog.service';
import { BlogLayoutService } from '../services/blog-layout.service';

@Component({
  selector: 'blog-layout-sidebar',
  templateUrl: './blog-layout-sidebar.component.html',
  styleUrls: ['./blog-layout-sidebar.component.css']
})
export class BlogLayoutSidebarComponent implements OnInit {
  blog: Blog;
  blogAge: {
    year?: number,
    month?: number,
    date?: number,
    hour?: number
  };

  constructor(
    private blogServ: BlogLayoutService
  ) {
    blogServ.blogSubject.subscribe(x => {
      if (x instanceof Blog) {
        this.blog = x;
        this.calBlogAge();
      }
    });
   }

  ngOnInit(): void {
  }

  private initBlogAge() {
    this.blogAge = { };
  }

  private calBlogAge() {
    let openDate = this.blog && this.blog.blogger && this.blog.openDate;
    if (openDate) {
      openDate = new Date(openDate);
      if (openDate.getFullYear() < 2000) {
        return;
      }
      this.initBlogAge();
      const now = new Date();
      const diff = (now.getTime() - openDate.getTime()) / 1000;
      let hours = Math.floor((diff / 60 / 60));
      if (hours < 24) {
        this.blogAge.hour = Math.floor(hours);
        return;
      }
      let days = hours / 24;
      hours = hours % 24;
      if (days < 365) {
        this.blogAge.date = Math.floor(days);
        this.blogAge.hour = Math.floor(hours);
        return;
      }
      const years = days / 365;
      days = days % 365;
      this.blogAge.year = Math.floor(years);
      this.blogAge.date = Math.floor(days);
      this.blogAge.hour = Math.floor(hours);
    }
  }
}
