import { Injectable, EventEmitter } from '@angular/core';
import { RestfulServiceBase } from './service-base';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { BlogUser } from '../../models/blog-user';
import { AuthService } from '../Auth/auth.service';
import { Observable, Subject } from 'rxjs';
import { toHttpPatchOperations } from '../../models/base-model';
import { Sex } from '../../models/sex.enum';

@Injectable()
export class UserService extends RestfulServiceBase {
  userObserver: Observable<BlogUser|HttpErrorResponse>;
  currentUser: BlogUser = null;
  userSubject: Subject<BlogUser|HttpErrorResponse>;

  constructor(
    private authServ: AuthService,
    private http: HttpClient
  ) {
    super(`${environment.apiBaseUrl}${environment.endpoints.userEndpoint}`);
    this.userSubject = new Subject<BlogUser|HttpErrorResponse>();
    this.userObserver = this.userSubject.asObservable();
  }

  uploadAvatar(avatarFile: File) {
    const form = new FormData();
    form.append('avatar', avatarFile);
    return this.http.put(
      `${this.baseUrl}/avatar`, form , {
        observe: 'response',
        headers: this.AuthorizationHeader
      }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUser(refresh: boolean = false) {
    if (!this.authServ.isLogined) {
      this.currentUser = null;
      this.userSubject.next(this.currentUser);
    } else if (this.authServ.isLogined) {
      if (this.currentUser && !refresh) {
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
          if (environment.production) {
            this.currentUser.avatarUrl = this.currentUser.avatarUrl.replace(/^http:\/\/localhost:\d*/ , `${environment.apiBaseUrl}`);
          }
          return this.currentUser;
        }),
        catchError(this.handleError)
      ).subscribe(x => {
        this.userSubject.next(x);
      });
    }
  }

  updateUser(userId: number, data: {
    userName: string,
    email: string,
    birth: Date,
    sex: Sex
  }) {
    // console.log(data);
    const operations = toHttpPatchOperations(data);
    return this.http.patch(`${this.baseUrl}/${userId}`, operations, {
      headers: this.AuthorizationHeader,
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
