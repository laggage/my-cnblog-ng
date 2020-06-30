import { Injectable } from '@angular/core';
import { RestfulServiceBase } from './service-base';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { PostComment } from '../../models/post-comment';

@Injectable()
export class CommentService extends RestfulServiceBase {

  constructor(
    private http: HttpClient
  ) {
    super(`${environment.apiBaseUrl}${environment.endpoints.commentEndpoint}`);
   }

  getComments(queryParams: {
    repliedPostId?: number,
    repliedUserId?: number,
    repliedCommentId?: number
  }) {
    const httpParams = new HttpParams();
    for (const key in queryParams) {
      if (queryParams[key]) {
        // console.log(key, queryParams[key]);
        httpParams.append(key, `${queryParams[key] && queryParams[key]}`);
        console.log(httpParams);
      }
    }
    return this.http.get<PostComment[]>(this.baseUrl, {
      observe: 'response',
      params: {
        repliedPostId: `${queryParams.repliedPostId}`
      },
    }).pipe(
      retry(2),
      map(x => {
        return x.body.map(c => Object.assign(new PostComment(), c));
      }),
      catchError(this.handleError)
    );
  }
}
