import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';
import { MatNativeDateModule} from '@angular/material/core'
import { Todo, todoStep } from '../lib';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {

    todo!:Todo ;
    step:string="";
    isChecked = false;
    steps:todoStep[] = [];
    today:Date =  new Date()

    constructor (private _todosService: TodosService, private _router: ActivatedRoute) {
      console.log(_router.snapshot.params);
      _todosService.getTodoById(_router.snapshot.params['id']).subscribe({
        next:(value)=> {
           this.todo = value.data;     
        },
        error(err) {
          alert(err.error.message);
        },
      })
    }

    onSelect(newDate:Date){
      this._todosService.UpdateTodoDate(this.todo._id, newDate ).subscribe({
        next:(res)=>{
          console.log(res);
          
          this.todo.deadline = res.deadline;
        },
        error:(err) => {
          alert(err.error.message);
        }
      });
    }

    modifySteps(){
       if(this.step.trim().length > 0)
        { this.todo.steps?.push({text: this.step, isChecked:false})}
      else
        { alert("Please enter a right step")}
    }

    toggleStepState(step:todoStep) {
      step.isChecked = ! step.isChecked;
    }
    }

