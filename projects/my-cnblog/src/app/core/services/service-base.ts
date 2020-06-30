import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';
import { BearerToken } from '../../models/bearer-token';
import { environment } from 'projects/my-cnblog/src/environments/environment';

export abstract class RestfulServiceBase {
  constructor(
    public baseUrl: string
  ) {
  }

  protected getToken(): BearerToken {
    let token: BearerToken;
    token = Object.assign(new BearerToken(), JSON.parse(localStorage.getItem(environment.localStorageTokenKey)));
    if (!token.access_token || token.access_token.length < 1) {
      return null;
    }
    return token;
  }

  protected handleError(error: any) {
    return new Observable<HttpErrorResponse>(s => {
      s.next(error);
      s.complete();
    });
  }

  get AuthorizationHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken().access_token}`
    });
  }
}
