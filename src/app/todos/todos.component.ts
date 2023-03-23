import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoFilter, TodoStatus } from '../lib';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  todoStatus!: TodoStatus;

  constructor(private _todosService: TodosService, private _activatedRoute: ActivatedRoute) {
    this._todosService.status$.subscribe((res) => {
      this.getTodos(res)
    })
  }

  getTodos(filter: TodoFilter) {
    this._todosService.getTodos().subscribe({
      next: (result) => {
        this.todos = result.data;
        this.todos = this._todosService.filterTodo(this.todos, filter);
      }
    });
  }

  addTodo() {
    this._todosService.addTodo(this.newTodoTitle).subscribe({
      next: (res) => {
        const { title, status, _id } = res.data
        this.todos.push({ _id, title, status })
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  editTodoStatus(selectedTodo: Todo, status: string): void {
    // console.log(selectedTodo);

    switch (status) {
      case 'completed':
        this.todoStatus = TodoStatus.COMPLETED
        break;

      case 'favourite':
        this.todoStatus = TodoStatus.FAVOURITE
        break;

      case 'deleted':
        this.todoStatus = TodoStatus.DELETED;
        this.getTodos(this._activatedRoute.snapshot.params['status'])
        break;
    }

    this._todosService.toggleTodoStatus(selectedTodo, this.todoStatus);
    this._todosService.updateTodos(selectedTodo).subscribe({
      next(value) {
        console.log(value);

      },
      error(err) {
        console.log(err);

      },
    })
  }
}
