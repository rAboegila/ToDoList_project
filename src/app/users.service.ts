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
      userName: 'somaya',
      quote: 'dfdgjfklds',
      password: '12345',
      loggedIn: false,
    }
  ];
  currentUser = new BehaviorSubject('')

  constructor() { }

  addUser(formValues: { userName: string, password: string, quote: string }) {
    const { userName, password, quote } = formValues;
    let newId: number = 1
    const length = this.users.length;
    const userID = Number(((this.users.at(length - 1))?.id));
    if (length > 0)
      newId = userID + 1;
    else newId = 1;
    this.users.push({
      userName,
      quote,
      id: newId,
      password,
      loggedIn: false
    });
  }

  userExists(): number {
    if (this.users.length && this.users[this.users.length - 1].loggedIn) {
      this.currentUser.next(JSON.stringify(this.users[this.users.length - 1]))
      return 1
    }
    this.currentUser.next('');
    return 0
  }

  viewUser(): User {
    return JSON.parse(this.currentUser.getValue());
  }

  login(userName: string, password: string): User | null {
    let user: User | undefined = this.users.find((ele) => ele.userName === userName && ele.password === password)
    if (user) {
      user.loggedIn = true;
      return user;
    }
    return null
  }

}
