import { Injectable } from '@angular/core';
import { Todo } from './lib';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
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
  constructor() {}

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
    // this.todos.splice(this.todos.indexOf(todo), 1);
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

  getTodos(): Todo[] {
    let todos: Todo[] = this.todos.filter((todo: Todo) => !todo.deleted);
    console.log(this.todos);
    return todos;
  }

  getFavouriteTodos(): Todo[] {
    return this.todos.filter((todo) => todo.favourite);
  }

  getCompleteTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  getdeletedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.deleted);
  }

  deleteTodoPermanent(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}
