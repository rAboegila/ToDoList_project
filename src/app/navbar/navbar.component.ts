import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilter, User, TodoStatus, Todo } from '../lib';
import { TodosService } from '../todos.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin: boolean = false;
  user: User | any;
  todos: Todo[] = [];

  counters: { deletedCount: number, favCount: number, completedCount: number } = {
    deletedCount: 0,
    favCount: 0,
    completedCount: 0
  };

  constructor(private _userService: UsersService, private _router: Router, private _todosService: TodosService) {
    this._userService.loggedIn$.subscribe((res) => {
      this.isLogin = res;
      if (res) {
        this._userService.getUser().subscribe(response => {
          this.user = response;
          this.user.loggedIn = res;
          this.isLogin = res;
          console.log(response);
        })
      }
    })
    this.counters = this._todosService.counters;
  }


  showAll() {
    this._todosService.setFilter(TodoFilter.ALL);
    this._router.navigate(['/todos/all'])
    console.log('user\n', this.user)
  }

  showFav() {
    this._todosService.setFilter(TodoFilter.FAVOURITE)
    this._router.navigate(['/todos/favourite'])
  }
  showDeleted() {
    this._todosService.setFilter(TodoFilter.DELETED)
    this._router.navigate(['/todos/deleted'])
  }
  showCompeleted() {
    this._todosService.setFilter(TodoFilter.COMPLETED)
    this._router.navigate(['/todos/compeleted'])
  }

  register() {
    this._router.navigate(['/register'])
  }
  logout() {
    this._userService.logout()
  }
}
