import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../lib';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

 constructor(){
  
 }
  @Input()todo!:Todo;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() completeTodoEvent = new EventEmitter<number>();
  @Output() favouriteTodoEvent = new EventEmitter<number>();



  removeTodo():void{
    this.deleteTodoEvent.emit(this.todo); 
  }

  completeTodo():void{
    this.completeTodoEvent.emit(this.todo.id); 
  }  
  favTodo():void{
    this.favouriteTodoEvent.emit(this.todo.id); 
  }
}

