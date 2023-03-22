import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, TodoFilter } from './lib';
@Injectable({
  providedIn: 'root',
})
export class TodosService {

  status = new BehaviorSubject(TodoFilter.ALL);
  status$ = this.status.asObservable();

  todos: Todo[] = [
    {
      id: 1,
      title: 'Do something nice for someone I care about',
      completed: false,
      deleted: false,
      favourite: false,
    },
    {
      id: 2,
      title: 'Memorize the fifty states and their capitals',
      completed: false,
      deleted: false,
      favourite: false,
    },
    {
      id: 3,
      title: 'Watch a classic movie',
      completed: false,
      deleted: false,
      favourite: false,
    },
  ];
  constructor() { }


  addTodo(todoTitle: string) {
    if (todoTitle.trim().length > 0) {
      let newId: number;
      if (this.todos.length > 0)
        newId = this.todos[this.todos.length - 1].id + 1;
      else newId = 1;
      this.todos.push({
        title: todoTitle,
        completed: false,
        favourite: false,
        deleted: false,
        id: newId,
      });
    } else alert('Please Add vallid Todo');
  }

  deleteTodo(todo: Todo) {
    todo.deleted = true;
  }

  toggleTodoStatus(id: number) {
    let selectedTodoIdx: number = this.todos.findIndex(
      (todo) => todo.id === id
    );
    this.todos[selectedTodoIdx].completed =
      !this.todos[selectedTodoIdx].completed;
  }

  toggleTodoFavourite(id: number) {
    let selectedTodoIdx: number = this.todos.findIndex(
      (todo) => todo.id === id
    );
    this.todos[selectedTodoIdx].favourite =
      !this.todos[selectedTodoIdx].favourite;
    console.log(this.todos);
  }

  setFilter(filter: TodoFilter) {
    this.status.next(filter)
  }

  filterTodo(filter: TodoFilter): Todo[] {
    return this.todos.filter(
      (todo) => {
        switch (filter) {
          case TodoFilter.COMPLETED:
            return todo.completed && !todo.deleted
          case TodoFilter.FAVOURITE:
            return todo.favourite && !todo.deleted
          case TodoFilter.DELETED:
            return todo.deleted
          case TodoFilter.ALL:
            return !todo.deleted
        }
      });
  }

  deleteTodoPermanent(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}
