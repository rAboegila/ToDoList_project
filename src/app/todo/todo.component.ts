import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoFilter } from '../lib';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  
 openDeleteModal:boolean = false;
 @Input() todosCategory:string = TodoFilter.ALL;

 constructor(){
  
 }
  @Input()todo!:Todo;
  @Output() deleteTodoEvent = new EventEmitter<number>();
  @Output() completeTodoEvent = new EventEmitter<number>();
  @Output() favouriteTodoEvent = new EventEmitter<number>();
  @Output() undoDeleteEvent = new EventEmitter<Todo>();

  confirmRemoveTodo():void {
    // access right todo
    this.openDeleteModal = true;
    this.removeTodo()
  }

  removeTodo():void{  
    // access wrong todo  
    this.deleteTodoEvent.emit(this.todo._id); 
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

