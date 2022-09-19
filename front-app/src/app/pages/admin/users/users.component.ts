import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from './services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['nombre', 'apellidos', 'username', 'actions'];
  dataSource = new MatTableDataSource();
  constructor(private userSvc: UsersService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.listar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  listar() {
    this.userSvc.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (users: UserResponse[]) => {
      console.log(users)
      this.dataSource.data = users;
    });
  }

  onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro de Usuario',
        user
        
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.snackBar.open(result.message, '', {
            duration: 5 * 1000,
            panelClass: [ result.code == 0 ? 'success-snackbar' : 'error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })

          this.listar();
        }
      });
  }

  onDelete(cveUsuario: number) {
    Swal.fire({
      title: '',
      text: `¿Realmente desea eliminar el registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkRed',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( (result) => {
      if (result.isConfirmed) {
        this.userSvc.delete(cveUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe( (result: any) => {
            if (result) {
              this.snackBar.open(result.message, '', {
                duration: 5 * 1000,
                panelClass: [ result.code == 0 ? 'success-snackbar' : 'error-snackbar'],
                horizontalPosition: 'right',
                verticalPosition: 'top'
              })

              this.listar();
            }
          });
      }
    })
  }

}
