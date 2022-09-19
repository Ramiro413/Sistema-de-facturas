import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { User, UserResponse } from '@shared/models/user.interface';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private utilsSvc: UtilsService) {
      this.checkToken();
    }

    get token$(): Observable<string> {
      return this.token.asObservable();
    }

  login(userData: any): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${ environment.API_URL }/auth`, userData)
      .pipe(map((user: UserResponse) => {

        if (user.code === 0 && user.token) {
          this.router.navigate(['home']);
          this.token.next(user.token);
          this.saveLocalStorage(user.token);
        }
        return user;
      }), 
      catchError( (error) => this.handlerError(error)));
  }

  logout() {
    localStorage.removeItem("token");
    this.token.next("");
    this.utilsSvc.openSidebar(false);
    this.router.navigate(["login"]);
  }

  checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.logout();
      } else {
        this.token.next(token);
      }
    }
  }

  saveLocalStorage(token: string) {
    localStorage.setItem("token", token);
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
