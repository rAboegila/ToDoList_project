import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../lib';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  
 openDeleteModal:boolean = false;
 constructor(){
  
 }
  @Input()todo!:Todo;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() completeTodoEvent = new EventEmitter<number>();
  @Output() favouriteTodoEvent = new EventEmitter<number>();
  @Output() undoDeleteEvent = new EventEmitter<Todo>();

  confirmRemoveTodo():void {
    this.openDeleteModal = true;
  }

  removeTodo():void{    
    this.deleteTodoEvent.emit(this.todo); 
  }

  completeTodo():void{
    this.completeTodoEvent.emit(this.todo._id); 
  }  
  favTodo():void{
    this.favouriteTodoEvent.emit(this.todo._id); 
  }

  undo():void{
    this.undoDeleteEvent.emit(this.todo);
  }
}

