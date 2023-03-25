import { Component, DoCheck, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  filteredTodos: Todo[] = [];
  newTodoTitle: string = '';
  todosCategory!: TodoFilter;
  @ViewChild('taskForm') myTodo!: NgForm;

  todoStatus!: TodoStatus;

  constructor(private _todosService: TodosService, private _activatedRoute: ActivatedRoute) {
    this._todosService.status$.subscribe((res) => {
      this.todosCategory = res;
      this.getTodos(res)
    })

  }

  getTodos(filter: TodoFilter) {
    this._todosService.getTodos().subscribe({
      next: (result) => {
        this.todos = result.data;
        this.updateCounters();
        console.log(this._todosService.counters);
        this.filteredTodos = this._todosService.filterTodo(this.todos, filter);

      }
    });
  }
  updateCounters() {
    this._todosService.counters.deletedCount = this.todos.filter(todo => todo.status.deleted).length
    this._todosService.counters.favCount = this.todos.filter(todo => todo.status.favourite && !todo.status.deleted).length
    this._todosService.counters.completedCount = this.todos.filter(todo => todo.status.completed && !todo.status.deleted).length
  }
  addTodo() {
    this._todosService.addTodo(this.myTodo.value.title).subscribe({
      next: (res) => {
        const { title, status, _id } = res.data
        this.filteredTodos.push({ _id, title, status, priority: this.myTodo.value.priority })
      },
      error: (err) => {
        alert(err.error.message);
      }
    });

  }

  editTodoStatus(selectedTodo: Todo, status: string): void {
    switch (status) {
      case 'completed':
        this.todoStatus = TodoStatus.COMPLETED
        break;

      case 'favourite':
        this.todoStatus = TodoStatus.FAVOURITE
        break;

      case 'deleted':
        this.todoStatus = TodoStatus.DELETED;
        break;
    }



    this._todosService.toggleTodoStatus(selectedTodo, this.todoStatus);
    this._todosService.updateTodos(selectedTodo).subscribe({
      next(value) {
        console.log('update', value);

      },
      error(err) {
        alert(err.error.message);
      },
    })
    this.updateCounters();

  }


  submitMyTodo(form: NgForm) {
    this.addTodo();
    form.reset()
  }

}
