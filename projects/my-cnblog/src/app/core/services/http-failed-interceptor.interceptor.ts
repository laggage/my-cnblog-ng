import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpFailedInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        null,
        err => {
          if (err instanceof HttpResponseBase) {
            if (err.status >= 500) {
              this.router.navigateByUrl('/500');
            } else if (err.status === 403) {
              this.router.navigateByUrl('/403');
            } else if (!err.status) {
              this.router.navigateByUrl('/404');
            }
          }
        }
      )
    );
  }
}
