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

  counters = {
    'deletedCount': 0,
    'favCount': 0,
    'completedCount': 0
  }

  constructor(private _http: HttpClient) { }

  addTodo(newTodo: any) {

    let tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)

    if (newTodo.deadline == "")
      newTodo.deadline = tomorrow.toISOString().split('T')[0];
    if (newTodo.priority == "" || newTodo.priority == null) {
      newTodo.priority = "Low"
    }
    console.log(newTodo.priority);
    return this._http.post<any>(`${environment.baseUrl}todos`, newTodo
    )
  }

  getTodos() {
    return this._http.get<any>(`${environment.baseUrl}todos`)
  }

  getTodoById(id: number) {
    return this._http.get<any>(`${environment.baseUrl}todos/${id}`)
  }

  updateTodos(todo: Todo) {
    return this._http.patch<any>(`${environment.baseUrl}todos/${todo._id}`, { status: todo.status, deadline: todo.deadline, steps: todo.steps })
  }

  UpdateTodoDate(id: number, date: Date) {
    return this._http.patch<any>(`${environment.baseUrl}todos/${id}`, { _id: id, deadline: date })
  }

  toggleTodoStatus(selectedTodo: Todo, statusType: TodoStatus) {
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
