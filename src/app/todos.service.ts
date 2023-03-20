import { Injectable } from '@angular/core';
import { Todo } from './lib';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Do something nice for someone I care about',
      completed: false,
      deleted:false,
      favourite:false
    },
    {
      id: 2,
      title: 'Memorize the fifty states and their capitals',
      completed: false,
      deleted:false,
      favourite:false
    },
    {
      id: 3,
      title: 'Watch a classic movie',
      completed: false,
      deleted:false,
      favourite:false
    },
  ];
  constructor() { }
}
