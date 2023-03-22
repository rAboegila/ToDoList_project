import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './lib';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    {
      id: 1,
      username: 'somaya',
      quote: 'dfdgjfklds',
      password: '12345',
      loggedIn: false,
    }
  ];
  loggedIn = new BehaviorSubject(false)
  loggedIn$ = this.loggedIn.asObservable();
  constructor() { }

  addUser(formValues: { username: string, password: string, quote: string }) {
    const { username, password, quote } = formValues;
    let newId: number = 1
    const length = this.users.length;
    const userID = Number(((this.users.at(length - 1))?.id));
    if (length > 0)
      newId = userID + 1;
    else newId = 1;
    this.users.push({
      username,
      quote,
      id: newId,
      password,
      loggedIn: false
    });
  }

  userLoggedIn(): boolean {
    return this.loggedIn.getValue()
  }


  login(userName: string, password: string): User | null {
    let user: User | undefined = this.users.find((ele) => ele.username === userName && ele.password === password)
    if (user) {
      this.loggedIn.next(true)
      user.loggedIn = true;
      console.log(user);
      return user;
    }
    return null
  }

}
