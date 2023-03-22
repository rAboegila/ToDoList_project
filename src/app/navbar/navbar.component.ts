import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin: boolean = false;

  constructor(private _userService: UsersService, private _router: Router) {
    this._userService.currentUser.subscribe(() => {
      if (this._userService.currentUser.getValue()) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }

  showFav() {
    this._router.navigate(['/todos/favourite'])
  }
  showDeleted() {
    this._router.navigate(['/todos/deleted'])
  }
  showCompeleted() {
    this._router.navigate(['/todos/compeleted'])
  }

  register() {
    this._router.navigate(['/register'])
  }
  logout() {
    alert('logout completed');
    this.isLogin = false
    this._router.navigate(['/'])
  }
}
