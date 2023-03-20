import { Component } from '@angular/core';
import { Todo } from '../lib';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos:Todo[] = [];
  newTodoTitle:string='';
  
  constructor(private _todosService: TodosService){
    this.todos = _todosService.getTodos();
  }

  addTodo(){
    console.log('hello');
    this._todosService.addTodo(this.newTodoTitle);
    this.todos = this._todosService.getTodos();
    console.log(this.newTodoTitle);
  }

  deleteTodo(todo:Todo):void{
    this._todosService.deleteTodo(todo);
    this.todos = this._todosService.getTodos();
  }

  changeTodoStatus(id:number):void{
    this._todosService.toggleTodoStatus(id);
  }

  changeTodoFavourite(id:number):void{
    this._todosService.toggleTodoFavourite(id);
  }
}
