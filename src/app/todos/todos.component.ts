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
  
  constructor(private _todosService: TodosService){
    this.todos = _todosService.todos;
  }

  

}
