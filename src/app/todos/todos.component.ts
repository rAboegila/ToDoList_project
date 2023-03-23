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
  newTodoTitle: string = '';
  todosCategory!:TodoFilter;
  @ViewChild('taskForm') myTodo!:NgForm ;

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
        this.todos = this._todosService.filterTodo(this.todos, filter);
      }
    });
  }

  addTodo() {
    this._todosService.addTodo(this.myTodo.value.title).subscribe({
      next: (res) => {
        const { title, status, _id } = res.data
        this.todos.push({ _id, title, status, priority:this.myTodo.value.priority })
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

    
    // this.getTodos(this._activatedRoute.snapshot.params['status'])
    this._todosService.toggleTodoStatus(selectedTodo, this.todoStatus);
    this._todosService.updateTodos(selectedTodo).subscribe({
      next(value) {
        console.log(value);        
      },
      error(err) {
        alert(err.error.message);
      },
    })
  }

  
  submitMyTodo(form:NgForm) {
    this.addTodo();
    form.reset()
  }

}
