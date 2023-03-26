import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, TodoFilter } from '../lib';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todosCategory: string = TodoFilter.ALL;
  @Input() todo!: Todo;

  @Output() deleteTodoEvent = new EventEmitter<number>();
  @Output() completeTodoEvent = new EventEmitter<number>();
  @Output() favouriteTodoEvent = new EventEmitter<number>();
  @Output() undoDeleteEvent = new EventEmitter<Todo>();
  constructor(private _router: Router) { }

  removeTodo(): void {
    // access wrong todo
    this.deleteTodoEvent.emit(this.todo._id);
  }

  completeTodo(): void {
    this.completeTodoEvent.emit(this.todo._id);
  }
  favTodo(): void {
    this.favouriteTodoEvent.emit(this.todo._id);
  }

  undo(): void {
    this.undoDeleteEvent.emit(this.todo);
  }

  goToDetails() {
    if (this.todosCategory === 'deleted') {
      alert("restore todo to continue")
    } else {
      this._router.navigate(['todo', `${this.todo._id}`]);
    }
  }
}
