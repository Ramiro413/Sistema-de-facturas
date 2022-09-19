import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionGuard implements CanActivate {
  
  constructor(private authSvc: AuthService, 
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map(token =>  {
        if (token) return true;

        this.router.navigate(['login']);
        return false;
      })
    )
  }
  
}
