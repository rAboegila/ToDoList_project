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

  constructor(private _http: HttpClient,private _cookieService:CookieService , private _router:Router) { }

  register(formValues: { userName: string, password: string, quote: string }) {
    return this._http.post(`${environment.baseUrl}users/register`, formValues)
  }

  login(formValues: { userName: string, password: string }) {
    return this._http.post(`${environment.baseUrl}users/signin`, formValues)
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue()
  }

  AuthenticateUser() {
    this.loggedIn.next(true);
  }

  logout() {
    this._cookieService.delete('token');  
    this.loggedIn.next(false);
    this._router.navigate(['/'])
  }

  getUser() {
    return this._http.get(`${environment.baseUrl}users`)
  }
}
