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
    this._UsersService.login(this.username, this.password).subscribe((res:any) => {
      this._UsersService.AuthenticateUser();
      this._router.navigate(['/', 'todos', 'all']);
      localStorage.setItem('token',res.token);
    },
      (err) => {
        alert('Please enter username and password');
        console.log(err)
      });
  }
}
