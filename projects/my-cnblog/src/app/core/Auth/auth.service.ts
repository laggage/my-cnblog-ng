import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import { BlogUser } from '../../models/blog-user';
import { BearerToken } from '../../models/bearer-token';
import { RestfulServiceBase } from '../services/service-base';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends RestfulServiceBase {
  private tokenReqUrl = `${environment.apiBaseUrl}${environment.endpoints.tokenEndpoint}`;
  private userRegisterUrl = `${environment.apiBaseUrl}${environment.endpoints.userEndpoint}`;

  static getToken(): BearerToken {
    let token: BearerToken;
    token = Object.assign(new BearerToken(), JSON.parse(localStorage.getItem(environment.localStorageTokenKey)));
    if (!token.access_token || token.access_token.length < 1) {
      return null;
    }
    return token;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super(``);
  }

  login(loginModel: {
    userName: string,
    securePassword: string,
    rememberMe?: boolean
  }) {
    this.deleteToken();
    return this.http.post<BearerToken>(this.tokenReqUrl, loginModel)
      .pipe(
        retry(2),
        map(x => {
          this.saveToken(x);
          return x;
        }),
        catchError(this.handleError)
      );
  }

  register(registerModel: {
    userName: string,
    securePassword: string,
    email: string,
    birth?: Date,
    avatar: File
  }) {
    const p = new DatePipe(`en-us`);
    const form = new FormData();
    form.append('userName', registerModel.userName);
    form.append('securePassword', registerModel.securePassword);
    form.append('email', registerModel.email);
    form.append('birth', `${p.transform(registerModel.birth, 'yyyy-MM-dd HH:mm:ss')}`);
    form.append('avatar', registerModel.avatar);

    if (!environment.production) {
      console.log(form);
    }
    return this.http.post<BlogUser>(this.userRegisterUrl, form, {
      observe: 'response'
    }).pipe(
      retry(2),
    );
  }

  get isLogined(): boolean {
    const token = AuthService.getToken();
    if (!token) {
      return false;
    }
    // 判断token是否过期
    return this.tokenExpired(token);
  }

  logout() {
    this.deleteToken();
  }

  to401Page() {
    this.router.navigateByUrl('/401');
  }

  to403Page() {
    this.router.navigateByUrl('/403');
  }


  private tokenExpired(token: BearerToken): boolean {
    try {
      // 判断token是否过期
      const accessToken = this.parseAccessToken(token.access_token);
      const iat: number = (accessToken.iat);
      const exp: number = (accessToken.exp);
      if (!environment.production) {
        console.log(exp, iat);
        // console.log(exp-iat > 0);
      }
      return exp - iat > 0;
    } catch {
      if (!environment.production) {
        console.log('token expired');
      }
      return false;
    }
  }

  private parseAccessToken(accessToken: string) {
    const t = Base64.decode(accessToken.match(/(?<=.*\.).*(?=\..*)/).pop());
    return JSON.parse(t);
  }

  /**
   * 保存token本地存储
   * @param token token信息
   */
  private saveToken(token: BearerToken): void {
    localStorage.setItem(environment.localStorageTokenKey, JSON.stringify(token));
  }

  private deleteToken() {
    localStorage.removeItem(environment.localStorageTokenKey);
  }
}
