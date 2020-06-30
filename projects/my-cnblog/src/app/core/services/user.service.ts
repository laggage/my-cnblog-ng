import { Injectable, EventEmitter } from '@angular/core';
import { RestfulServiceBase } from './service-base';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { BlogUser } from '../../models/blog-user';
import { AuthService } from '../Auth/auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService extends RestfulServiceBase {
  userObserver: Observable<BlogUser|HttpErrorResponse>;
  currentUser: BlogUser = null;
  private userSubject: Subject<BlogUser|HttpErrorResponse>;

  constructor(
    private authServ: AuthService,
    private http: HttpClient
  ) {
    super(`${environment.apiBaseUrl}${environment.endpoints.userEndpoint}`);
    this.userSubject = new Subject<BlogUser|HttpErrorResponse>();
    this.userObserver = this.userSubject.asObservable();
  }

  /**
   * 获取登录用户实例
   * 如果没有登录或者登录过期的, 则返回 null
   */
  getUser() {
    if (!this.authServ.isLogined) {
      this.currentUser = null;
      this.userSubject.next(this.currentUser);
    } else if (this.authServ.isLogined) {
      if (this.currentUser) {
        this.userSubject.next(this.currentUser);
        return;
      }
      const token = AuthService.getToken();
      this.http.get<any>(`${this.baseUrl}/active`, {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Bearer ${token.access_token}`
        })
      }).pipe(
        retry(2),
        map(x => {
          this.currentUser = Object.assign(new BlogUser(), x.body);
          return this.currentUser;
        }),
        catchError(this.handleError)
      ).subscribe(x => {
        this.userSubject.next(x);
      });
    }
  }
}
