import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';
import { MatNativeDateModule } from '@angular/material/core'
import { Todo, todoStep } from '../lib';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements AfterViewInit{

  todo!: Todo;
  step: string = "";
  isChecked = false;
  steps: todoStep[] = [];
  today: Date = new Date()
  tickTock!:string;

  constructor(private _todosService: TodosService, private _router: ActivatedRoute) {
    _todosService.getTodoById(_router.snapshot.params['id']).subscribe({
      next: (value) => {
        this.todo = value.data;
      },
      error(err) {
        alert(err.error.message);
      },
    })
  }

  onSelect(newDate: Date) {
    this._todosService.UpdateTodoDate(this.todo._id, newDate).subscribe({
      next: (res) => {
        this.todo.deadline = res.deadline;
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

  modifySteps() {
    if (this.step.trim().length > 0) { this.todo.steps?.push({ text: this.step, isChecked: false }) }
    else { alert("Please enter a right step") }
    
    this._todosService.updateTodos(this.todo).subscribe((res => { console.log(res) }))
  }

  toggleStepState(step: todoStep) {
    step.isChecked = !step.isChecked;
    this._todosService.updateTodos(this.todo).subscribe((res => { console.log(res) }))

  }

  countDown(){
    let now = new Date().getTime();
    let distance = new Date(this.todo.deadline).getTime() - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.tickTock = `${days}d  ${hours}h ${minutes}m ${seconds}s`
  }

  ngAfterViewInit(): void {
    setInterval(() => {
     this.countDown()
    }, 1000);
  }
}

