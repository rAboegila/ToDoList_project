import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodosComponent } from './todos/todos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: 'todos', redirectTo: 'todos/all', pathMatch: 'full'},
  { path: 'todos/:status', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'todo/:id', component: TodoDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
