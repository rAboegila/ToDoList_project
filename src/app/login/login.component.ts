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
  userName: string = '';
  password: string = '';
  errors: string = '';

  constructor(private _UsersService: UsersService, private _router: Router) {

  }
  login(form: NgForm) {
    this._UsersService.login(form.value).subscribe((res: any) => {
      this._UsersService.AuthenticateUser();
      this._router.navigate(['/', 'todos', 'all']);
      localStorage.setItem('token', res.token);
    },
      (err) => {
        this.errors= err.error.message
      });
  }
}
