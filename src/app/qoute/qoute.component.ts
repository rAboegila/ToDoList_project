import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../lib';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-qoute',
  templateUrl: './qoute.component.html',
  styleUrls: ['./qoute.component.css']
})
export class QouteComponent {
  user: User | any
  constructor(private _userService: UsersService, private _router: Router) {
    this._userService.loggedIn$.subscribe((res) => {
      if (res) {
        this._userService.getUser().subscribe(response => {
          this.user = response;
          console.log(response);
        })
        this.user.loggedIn = res
      }
    })

  }

}