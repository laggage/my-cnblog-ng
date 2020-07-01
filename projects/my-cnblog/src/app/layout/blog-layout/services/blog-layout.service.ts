import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../core/services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BlogLayoutService {
  blogSubject = new Subject<Blog | HttpErrorResponse>();
  localBlog: Blog;

  constructor(
    private blogServ: BlogService
  ) {
  }

  loadBlog(blogId: number, fields?: string) {
    this.blogServ.getById(blogId, fields).subscribe(
      x => {
        if (x instanceof Blog) {
          this.localBlog = x;
        }
        this.blogSubject.next(x);
      }
    );
  }
}
