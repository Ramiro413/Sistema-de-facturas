import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, 
    private snackBar: MatSnackBar) { }

    getUsers(): Observable<UserResponse[]> {
      return this.http.get<UserResponse[]>(`${environment.API_URL}/usuarios`)
      .pipe(catchError( (error) => this.handlerError(error)));
    }

    

    new(user: UserResponse): Observable<any> {
      return this.http.post<any>(`${ environment.API_URL }/usuarios`, user)
      .pipe(catchError( (error) => this.handlerError(error)));
    }

    update(user: UserResponse): Observable<any> {
      return this.http.put<any>(`${ environment.API_URL }/usuarios`, user)
      .pipe(catchError( (error) => this.handlerError(error)));
    }

    delete(cveUsuario: number): Observable<any> {
      return this.http.delete<any>(`${ environment.API_URL }/usuarios/${cveUsuario}`)
    }

  handlerError(error: any): Observable<never> {
    let errorMessage  = "Ocurrio un error";
    if (error) {
      errorMessage = `${ error.error.message }`;
    }

    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })

    return throwError(errorMessage);
  }
}
