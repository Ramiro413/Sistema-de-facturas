import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  
  constructor(private authSvc: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map(token => (!token ? true : false))
    )
  }
  
}
