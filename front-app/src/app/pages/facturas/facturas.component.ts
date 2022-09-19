import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaResponse } from '@app/shared/models/factura.interface';
import { Subject, takeUntil } from 'rxjs';
import { FacturasDialogComponent } from './components/facturas-dialog/facturas-dialog.component';
import { FacturasService } from './services/facturas.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['rfc', 'direccion', 'cfid', 'fechaFactura','nombre', 'actions'];
  dataSource = new MatTableDataSource();
  constructor(private facturasSvc: FacturasService, 
   
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    


    this.listar();

  }
  claveUsu():any {
    const helper = new JwtHelperService();
    const datos = localStorage.getItem('token');

    const decodedToken = helper.decodeToken(datos?.toString());
    return decodedToken.cveUsuario;
  }

  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  listar() {

   
    this.facturasSvc.getFacturas()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (facturas: FacturaResponse[]) => {

      this.dataSource.data = facturas;

    });
  }

  onOpenModal(facturas = {}) {
    const dialogRef = this.dialog.open(FacturasDialogComponent, {
      minWidth: '60%',
      
      data: {
        title: 'Registro de Factura',
       
        facturas
        
      }
    });
    console.log(facturas)
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

  onDelete(cveFactura: number) {
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
        this.facturasSvc.delete(cveFactura)
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
