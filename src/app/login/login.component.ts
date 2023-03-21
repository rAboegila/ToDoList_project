import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private _UsersService: UsersService, private _router: Router) {

  }
  login() {
    if (this.username.trim().length && this.password.trim().length) {
      const user = this._UsersService.login(this.username, this.password);
      if (!user) {
        alert('username and password don\'t match');
        return;
      }
      this._router.navigate(['/', 'todos']);
    } else alert('Please enter username and password');
  }
}
