import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '@app/shared/models/user.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm = this.fb.group({
    username : ['', [Validators.required]],
    password : ['', [Validators.required, Validators.minLength(3)]]
  });
  constructor(private fb: FormBuilder, private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {

    // Se verifica que el formulario sea correcto
    if (this.loginForm.invalid) return;  

    // obtener los datos del formulario
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue)
      .subscribe((user: UserResponse | void) => {
        console.log(user);
      });

  }

  getErrorMessage(field: string) {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo requerido';
      } else if (form.hasError('minlength')) {
        message = 'El mínimo de caracteres son 5';
      }
    }
    return message;
  }

  isValidField(field: string) {
    var form = this.loginForm.get(field);
    var flag = false;
    if (form != null) {
      flag = form.touched || form.dirty && !form.valid
    }

    return flag;
  }

}
