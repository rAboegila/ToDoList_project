import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './lib';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  currentUser = new BehaviorSubject('')

  constructor() { }

  addUser(name: string, quote: string) {
    let newId: number;
    if (this.users.length > 0)
      newId = this.users[this.users.length - 1].id + 1;
    else newId = 1;
    this.users.push({
      name,
      quote,
      id: newId,
      loggedIn: true
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
}
