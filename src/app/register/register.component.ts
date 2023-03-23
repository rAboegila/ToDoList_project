import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errors: string = '';

  regForm: FormGroup;
  constructor(private _usersService: UsersService, private _router: Router) {
    this.regForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]),
      quote: new FormControl(null, [Validators.required]),
    })

  }
  registerUser(regForm: FormGroup) {
    this._usersService.register(regForm.value).subscribe(
      (res) => {
        this._router.navigate(['/login'])
      },
      (err) => {
        if (err.error.message) {
          this.errors = err.error.message
        }        
      }
    );
  }
}
