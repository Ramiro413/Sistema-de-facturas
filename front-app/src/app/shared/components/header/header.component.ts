import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  isLogged = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.token$
    .pipe(takeUntil(this.destroy$))
    .subscribe( (token: string) => {
      if (token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete;
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authSvc.logout();
  }

}
