import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from '@app/shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UserResponse } from '@shared/models/user.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit,OnDestroy {

  actionTODO = Action.NEW;
  titleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true
  private destroy$ = new Subject<any>();
  userForm = this.fb.group({
    cveUsuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(350)]],
    apellidos: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(450)]],
    username: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(150)]],
   
    password:  ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(350)]],
    confirmPassword:  ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(350)]]
  }, {validator: this.checkIfMatchingPassword("password", "confirmPassword")});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserDialogComponent>, 
              private fb: FormBuilder,
              public baseForm: BaseForm,
              private usersSvc: UsersService) { }


              ngOnInit(): void {
                
                  this.patchData();
                
              }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onClean() {
    this.userForm.reset();
  }

  onSave() {
    if (this.userForm.invalid) return;

    const formvalue = this.userForm.getRawValue();

    // Se realizara la inserción
    if (this.actionTODO == Action.NEW)  {
      
      var newUser: UserResponse = {
        nombre: formvalue.nombre,
        apellidos: formvalue.apellidos,
        username: formvalue.username,
        password: formvalue.password
      }

      this.usersSvc.new(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }  else { // se actualizan los datos

      var updatedUser: UserResponse = {
        cveUsuario: formvalue.cveUsuario,
        nombre: formvalue.nombre,
        apellidos: formvalue.apellidos,
        username: formvalue.username
      }

      this.usersSvc.update(updatedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }
  }

  patchData() {
    if (this.data.user.cveUsuario) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";
      this.userForm.patchValue({
        cveUsuario: this.data?.user.cveUsuario,
        nombre: this.data?.user.nombre,
        apellidos: this.data?.user.apellidos,
        username: this.data?.user.username
      });
      this.userForm.get("username")?.disable();

      // eliminar las validaciones del password
      this.userForm.get("password")?.setValidators(null);
      this.userForm.get("confirmPassword")?.setValidators(null);
      this.userForm.get("password")?.setErrors(null);
      this.userForm.get("confirmPassword")?.setErrors(null);
      
      this.userForm.updateValueAndValidity();
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }

  checkIfMatchingPassword(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalentPasswords: true})
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

}
