import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilter } from '../lib';
import { TodosService } from '../todos.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin: boolean = false;
  user: any;
  constructor(private _userService: UsersService, private _router: Router, private _todoService: TodosService) {
    this._userService.loggedIn$.subscribe((res) => {
      this.isLogin = res
    })

    this._userService.getUser().subscribe(res => {      
      this.user = res;
    })
    
  }

  showFav() {
    this._todoService.setFilter(TodoFilter.FAVOURITE)
    this._router.navigate(['/todos/favourite'])
  }
  showDeleted() {
    this._todoService.setFilter(TodoFilter.DELETED)
    this._router.navigate(['/todos/deleted'])
  }
  showCompeleted() {
    this._todoService.setFilter(TodoFilter.COMPLETED)
    this._router.navigate(['/todos/compeleted'])
  }

  register() {
    this._router.navigate(['/register'])
  }
  logout() {
    this._userService.logout()
    this._router.navigate(['/'])
  }
}
