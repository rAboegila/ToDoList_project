import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, TodoFilter, TodoStatus } from './lib';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  status = new BehaviorSubject(TodoFilter.ALL);
  status$ = this.status.asObservable();

  constructor(private _http: HttpClient) { }

  addTodo(todoTitle: string) {
    return this._http.post<any>(`${environment.baseUrl}todos`, { title: todoTitle }
    )
  }

  getTodos() {
    return this._http.get<any>(`${environment.baseUrl}todos`)
  }

  updateTodos(todo: Todo) {
    return this._http.patch<any>(`${environment.baseUrl}todos/${todo._id}`, { status: todo.status })
  }

  toggleTodoStatus(selectedTodo: Todo, statusType: TodoStatus) {
    console.log("toggle",selectedTodo ,statusType);
    selectedTodo.status[statusType] = !selectedTodo.status[statusType];
  }

  setFilter(filter: TodoFilter) {
    this.status.next(filter)
  }

  filterTodo(todos: Todo[], filter: TodoFilter): Todo[] {
    return todos.filter(
      (todo) => {
        switch (filter) {
          case TodoFilter.COMPLETED:
            return todo.status.completed && !todo.status.deleted
          case TodoFilter.FAVOURITE:
            return todo.status.favourite && !todo.status.deleted
          case TodoFilter.DELETED:
            return todo.status.deleted
          case TodoFilter.ALL:
            return !todo.status.deleted
        }
      });
  }

  deleteTodoPermanent(todo: Todo, id: number) {
    return this._http.delete(`${environment.baseUrl}/todos/${id}}`);
  }
}
