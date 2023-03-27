import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TodoFilter } from '../lib';
import { TodosService } from '../todos.service';
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

  constructor(private _UsersService: UsersService, private _router: Router, private _cookieService: CookieService, private _todosService: TodosService) {

  }
  login(form: NgForm) {
    this._UsersService.login(form.value).subscribe((res: any) => {
      this._cookieService.delete('token');
      this._cookieService.set('token', res.token);
      this._UsersService.AuthenticateUser();
      this._todosService.setFilter(TodoFilter.ALL)
      this._router.navigate(['/', 'todos', 'all']);
    },
      (err) => {
        this.errors = err.error.message
      });
  }
}
