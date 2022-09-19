import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturaResponse } from '@app/shared/models/factura.interface';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient, 
    private snackBar: MatSnackBar) { }

    getFacturas(): Observable<FacturaResponse[]> {
     const token = localStorage.getItem('token')
     var a= token?.toString()
     console.log(a)
     console.log("AAAAAAAAAA")
    
      return this.http.get<FacturaResponse[]>(`${environment.API_URL}/facturas/${a}`)
      .pipe(catchError( (error) => this.handlerError(error)));
    }
    

    

    new(factura: FacturaResponse): Observable<any> {
      return this.http.post<any>(`${ environment.API_URL }/facturas`, factura)
      .pipe(catchError( (error) => this.handlerError(error)));
    }

    update(factura: FacturaResponse): Observable<any> {
      return this.http.put<any>(`${ environment.API_URL }/facturas`, factura)
      .pipe(catchError( (error) => this.handlerError(error)));
    }

    delete(cveFactura: number): Observable<any> {
      return this.http.delete<any>(`${ environment.API_URL }/facturas/${cveFactura}`)
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
