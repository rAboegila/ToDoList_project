import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  checkIfLogin(url: string): boolean {
    return !url.includes('login') || !url.includes('register');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = localStorage.getItem('token');
    if (token && this.checkIfLogin(request.url)) {
      request = request.clone({ headers: request.headers.append('Authorization', token) });
    }
    return next.handle(request);
  }
}
