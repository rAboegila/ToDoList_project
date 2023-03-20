import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  quote: string = '';

  constructor(private _UsersService: UsersService, private _router: Router) {

  }
  addUser() {
    if (this.username.trim().length && this.quote.trim().length) {
      this._UsersService.addUser(this.username, this.quote);
      this._router.navigate(['/', 'todos'])
    } else alert('Please Add vallid user and quote');
    }
}
