import { Component, ViewChild } from '@angular/core';
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
  minDate = new Date().toISOString().split('T')[0];
  maxDate = new Date(2024, 0, 1).toISOString().split('T')[0];
  priority = "Low"

  @ViewChild('taskForm') myTodo!: NgForm;

  todoStatus!: TodoStatus;

  constructor(private _todosService: TodosService, private _activatedRoute: ActivatedRoute) {
    this._todosService.status$.subscribe((res) => {
      this.todosCategory = res;
      this.getTodos(res)
    })

  }

  getTodos(filter: TodoFilter) {
    console.log('getTodos');
    this._todosService.getTodos().subscribe({
      next: (result) => {
        this.todos = result.data;
        this.filteredTodos = this._todosService.filterTodo(this.todos, filter);
        if (this.todos.length) this.updateCounters()
      }
    });
  }
  updateCounters() {
    let allCount = this.todos.length;
    this._todosService.counters.deletedCount = Math.floor((this.todos.filter(todo => todo.status.deleted).length) / allCount * 100)
    this._todosService.counters.favCount = Math.floor((this.todos.filter(todo => todo.status.favourite && !todo.status.deleted).length) / allCount * 100)
    this._todosService.counters.completedCount = Math.floor((this.todos.filter(todo => todo.status.completed && !todo.status.deleted).length) / allCount * 100)
  }
  addTodo() {
    this._todosService.addTodo({ ...this.myTodo.value }).subscribe({
      next: (res) => {
        const { title, status, _id, deadline } = res.data
        this.todos.push({ status, _id, title, deadline });
        this.filteredTodos.push({ status, _id, title, deadline });

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
        selectedTodo = value
      },
      error(err) {
        alert(err.error.message);
      },
    })

    this.filteredTodos = this._todosService.filterTodo(this.todos, this.todosCategory);
    this.updateCounters();
  }

  submitMyTodo(form: NgForm) {
    this.addTodo();
    form.reset()
  }
}
