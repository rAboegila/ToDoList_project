import { Component, DoCheck, OnChanges } from '@angular/core';
import { Todo, TodoStatus } from '../lib';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent  implements OnChanges{
  todos: Todo[] = [];
  newTodoTitle: string = '';
  todoStatus!: TodoStatus  ;

  constructor(private _todosService: TodosService) {

    this._todosService.status$.subscribe((res) => {
      this._todosService.getTodos().subscribe({
        next:(result) => {
          this.todos = result.data;
          this.todos = _todosService.filterTodo(this.todos,res);
      }} );
    })
  }

  ngOnChanges(): void {
    console.log('fired');
  }

  addTodo() {    
    this._todosService.addTodo(this.newTodoTitle).subscribe({
      next: (res) => 
      { console.log(res);
        const {title, status, _id} = res.data
        console.log(this.todos);
        this.todos.push({_id, title, status}) 
        console.log(this.todos);                      
           },
      error: (res) => {
        console.log(res);
      }
  });

  }

  deleteTodo(todo: Todo): void {
    this._todosService.deleteTodo(todo);
  }
 
  editTodoStatus(selectedTodo:Todo , status:string): void {
        switch(status)
         {
          case 'completed':
              this.todoStatus = TodoStatus.COMPLETED
            break;

          case 'favourite':
              this.todoStatus = TodoStatus.FAVOURITE
            break;

          case 'deleted':
              this.todoStatus = TodoStatus.DELETED
            break;
        }   

        this._todosService.toggleTodoStatus(selectedTodo, this.todoStatus);        
        this._todosService.updateTodos(selectedTodo).subscribe({
          next(value) {
            console.log(value);
            console.log(selectedTodo);
            
          },
          error(err) {
            console.log(err);
            
          },
        })
  }


  

}
