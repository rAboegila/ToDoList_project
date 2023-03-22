import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin: boolean = false;

  constructor(private _userService: UsersService) {
    this._userService.loggedIn$.subscribe((res) => {
      this.isLogin = res
    })
  }

}
