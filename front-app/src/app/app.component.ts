import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Facturas';
  opened = false;

  private destroy$ = new Subject<any>();
  constructor(private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe( (value: boolean) => {
        this.opened = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}