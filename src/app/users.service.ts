import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedIn = new BehaviorSubject(false)
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private _http: HttpClient) { }

  register(formValues: { userName: string, password: string, quote: string }) {
    return this._http.post(`${environment.baseUrl}users`, formValues)
  }

  login(userName: string, password: string) {
    return this._http.post(`${environment.baseUrl}users/signin`, { userName, password })
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue()
  }

  AuthenticateUser() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

  getUser() {
    let token: any = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders().set("Authorization", token)
    };
    return this._http.get(`${environment.baseUrl}users`, httpOptions)
  }
}
