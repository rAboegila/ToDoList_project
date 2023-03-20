import { Component, Input } from '@angular/core';
import { Todo } from '../lib';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

 constructor(){
  
 }
  @Input()todo:Todo;
}
