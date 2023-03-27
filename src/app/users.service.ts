import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedIn = new BehaviorSubject(false)
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router) { }

  register(formValues: { userName: string, password: string, quote: string }) {
    return this._http.post(`${environment.baseUrl}users/register`, formValues)
  }

  login(formValues: { userName: string, password: string }) {
    return this._http.post(`${environment.baseUrl}users/signin`, formValues)
  }

  isLoggedIn(): boolean {
    if(this._cookieService.get('token')) this.loggedIn.next(true)
    return this.loggedIn.getValue()
  }

  AuthenticateUser() {
    this.loggedIn.next(true);
  }

  logout() {
    this._cookieService.delete('token');
    this.loggedIn.next(false);
    this._router.navigate(['/']);
  }

  getUser() {
    return this._http.get(`${environment.baseUrl}users`)
  }

  getBrowserName() {
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edg') != -1:
        return 'Microsoft Edge';
      case agent.indexOf('opr') != -1 && !!(<any>window).opr:
        return 'Opera';
      case agent.indexOf('chrome') != -1 && !!(<any>window).chrome:
        return 'Google Chrome';
      case agent.indexOf('trident') != -1:
        return 'ie';
      case agent.indexOf('firefox') != -1:
        return 'FireFox';
      case agent.indexOf('safari') != -1:
        return 'Safari';
      default:
        return 'other';
    }
  }
  getOS() {
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf("win") != -1:
        return "Windows OS";
      case agent.indexOf("mac") != -1:
        return "Macintosh";
      case agent.indexOf("linux") != -1:
        return "Linux OS";
      case agent.indexOf("android") != -1:
        return "Android OS";
      case agent.indexOf("like mac") != -1:
        return "iOS";
      case agent.indexOf("x11") != -1:
        return "UNIX OS";
      default:
        return "Unknown OS";
    }
  }



  checkIfOnline() {
    return navigator.onLine;
  }
}
