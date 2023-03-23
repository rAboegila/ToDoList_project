import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _cookieService: CookieService) { }

  checkIfLogin(url: string): boolean {
    return (url.includes('signin') || url.includes('register'));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = this._cookieService.get('token');

    if (token && !this.checkIfLogin(request.url)) {
      request = request.clone({ headers: request.headers.append('Authorization', token) });
    }
    return next.handle(request);
  }
}
