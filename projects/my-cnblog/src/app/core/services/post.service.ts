import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post, Posts } from '../../models/post';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { RestfulServiceBase } from './service-base';
import { retry, map, catchError } from 'rxjs/operators';
import { PaginationInfo } from '../../models/pagination-info';
import { Blog } from '../../models/blog';
import { Subject } from 'rxjs';
import { BlogUser } from '../../models/blog-user';
import { Tag } from '../../models/tag';
import { HttpPatchOperations, HttpPatchOperation } from '../../models/http-patch-operations';

@Injectable()
export class PostService extends RestfulServiceBase {

  selectedPostSubject = new Subject<Post>();
  selectedPostObserver = this.selectedPostSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    super(`${environment.apiBaseUrl}${environment.endpoints.postEndpoint}`);
    console.log('post service constructed');
  }


  /**
   * TODO: 记录一下接收 text/plain 类型的数据
   */
  getPostContent(contentUrl: string) {
    let header = this.AuthorizationHeader;
    header = header.set('Accept', 'text/plain');
    header = header.set('Content-Type', 'text/plain');
    contentUrl = contentUrl.replace(/http:\/\/localhost:\d*/, `${environment.apiBaseUrl}`);
    return this.http.get(contentUrl, {
      observe: 'response',
      headers: header,
      responseType: 'text'
    }).pipe(
      retry(2),
      map(x => x.body),
      catchError(this.handleError)
    );
  }

  /**
   * 查询博文
   * @param queryParams 查询参数
   */
  getPosts(queryParams: {
    pageIndex?: number, // 为空则使用服务器默认参数
    pageSize?: number, // 为空则使用服务器默认参数
    blogId?: number,
    userId?: number
  } = { pageIndex: 1, pageSize: 10 }) {
    const qParams = {};
    for (const key in queryParams) {
      if (queryParams[key]) {
        qParams[key] = `${queryParams[key]}`;
      }
    }
    return this.http.get<Posts>(this.baseUrl, {
      params: qParams,
      observe: 'response'
    }).pipe(
      retry(2),
      map(x => {
        const posts = x.body.map(p => this.assignPost(p));
        const paginationInfo = Object.assign(
          new PaginationInfo(), JSON.parse(x.headers.get(environment.painationHeaderKey)));
        const result: {
          posts: Posts,
          paginationInfo: PaginationInfo
        } = { posts, paginationInfo };
        return result;
      }),
      catchError(this.handleError)
    );
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${this.baseUrl}/${id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      map(x => {
        return this.assignPost(x.body);
      }),
      catchError(this.handleError)
    );
  }

  addPost(post: Post) {
    const body = {
      title: post.title,
      description: post.description,
      content: post.content,
      isTopMost: post.isTopMost,
      topMostOrder: post.topMostOrder,
      isPublic: post.isPublic,
      tags: post.tags,
    };
    return this.http.post<Post>(
      this.baseUrl, body,
      {
        observe: 'response',
        headers: this.AuthorizationHeader
      }).pipe(
        retry(2),
        map(x => this.assignPost(x.body)),
        catchError(this.handleError)
      );
  }

  updatePost(postId: number, pathDoc: HttpPatchOperations) {
    const headers = this.AuthorizationHeader;
    return this.http.patch(`${this.baseUrl}/${postId}`, pathDoc, {
      observe: 'response',
      headers
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.baseUrl}/${postId}`, {
      headers: this.AuthorizationHeader
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * 接收到的 Post 数据需要处理一下, 统一在这里处理
   */
  private assignPost(post: Post) {
    post.blog = Object.assign(new Blog(), post.blog);
    post.blog.blogger = Object.assign(new BlogUser(), post.blog.blogger);
    post.tags = post.tags.map(t => Object.assign(new Tag(), t));
    return Object.assign(new Post(), post);
  }
}
