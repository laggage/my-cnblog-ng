import { Injectable } from '@angular/core';
import { RestfulServiceBase } from './service-base';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Blog } from '../../models/blog';
import { BlogUser } from '../../models/blog-user';

@Injectable()
export class BlogService extends RestfulServiceBase {

  constructor(
    private http: HttpClient
  ) {
    super(`${environment.apiBaseUrl}${environment.endpoints.blogEndpoint}/`);
  }

  getById(blogId: number, fields?: string) {
    const url = `${this.baseUrl}${blogId}`;
    return this.http.get<Blog>(
      url, {
      params: { fields: fields ? fields : '' },
      observe: 'response'
    }).pipe(
      retry(2),
      map(x => {
        return this.assignBlog(x.body);
      }),
      catchError(this.handleError)
    );
  }

  private assignBlog(blog: Blog) {
    blog.blogger = Object.assign(new BlogUser(), blog.blogger);
    return Object.assign(new Blog(), blog);
  }
}
