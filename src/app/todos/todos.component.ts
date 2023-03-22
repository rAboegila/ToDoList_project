import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoFilter } from '../lib';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private _todosService: TodosService, private _activatedRoute: ActivatedRoute) {
    // let status = this._activatedRoute.snapshot.params['status'];

    // console.log(status);
    
    this._todosService.status$.subscribe((res)=>{
      console.log(res);
      
      this.todos = _todosService.filterTodo(res);
    })
  }

  addTodo() {
    console.log('hello');
    this._todosService.addTodo(this.newTodoTitle);
    this.todos = this._todosService.getTodos();
    console.log(this.newTodoTitle);
  }

  deleteTodo(todo: Todo): void {
    this._todosService.deleteTodo(todo);
    this.todos = this._todosService.getTodos();
  }

  changeTodoStatus(id: number): void {
    this._todosService.toggleTodoStatus(id);
  }

  changeTodoFavourite(id: number): void {
    this._todosService.toggleTodoFavourite(id);
  }
}
