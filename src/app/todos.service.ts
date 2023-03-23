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

  todos: Todo[] = [];

   constructor(private _http: HttpClient) { }


  addTodo(todoTitle: string ) {
   return this._http.post<any>(`${environment.baseUrl}todos`,{title: todoTitle},{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `${localStorage.getItem('token')}`
    })
  })}


  getTodos(){
    return this._http.get<any>(`${environment.baseUrl}todos`,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${localStorage.getItem('token')}`
      })
    })
  }
  
  updateTodos(todo:Todo){
    return this._http.patch<any>(`${environment.baseUrl}todos/${todo.id}`,{status: todo.status},{
            headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${localStorage.getItem('token')}`
      })
    })
  }

  deleteTodo(todo: Todo) {
    todo.status.deleted = true;
  }

  toggleTodoStatus(selectedTodo:Todo, statusType:TodoStatus) {
    selectedTodo.status[statusType] = ! selectedTodo.status[statusType];
  }

  setFilter(filter: TodoFilter) {
    this.status.next(filter)
  }

  filterTodo(filter: TodoFilter): Todo[] {
    return this.todos.filter(
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
