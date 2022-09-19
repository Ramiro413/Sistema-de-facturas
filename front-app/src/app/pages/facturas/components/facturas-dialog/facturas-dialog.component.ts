import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from '@app/shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { FacturasService } from '../../services/facturas.service';
import { FacturaResponse } from '@shared/models/factura.interface';
import { Token } from '@angular/compiler';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-facturas-dialog',
  templateUrl: './facturas-dialog.component.html',
  styleUrls: ['./facturas-dialog.component.scss']
})
export class FacturasDialogComponent implements OnInit,OnDestroy {

  actionTODO = Action.NEW;
  titleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true
  private destroy$ = new Subject<any>();
  facturasForm = this.fb.group({
    cveFactura: [''],
    rfc: ['', [Validators.required,Validators.pattern('[A-Za-z0-9]*'), Validators.minLength(13), Validators.maxLength(13)]],
    direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    cfid: ['', [Validators.required]],
    fechaFactura: ['', [Validators.required, Validators.minLength(3)]]
   
   
  }, { validators: this.checkData("rfc","cfid")});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FacturasDialogComponent>, 
              private fb: FormBuilder,
              public baseForm: BaseForm,
              private facturasSvc: FacturasService) { }


              ngOnInit(): void {
                
                  this.patchData();
                
              }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  checkData(rfc: string, cfid: string) {
    return (group: FormGroup) => {
      let rfcdata = group.controls[rfc];
     
      if(rfcdata.value.length < 13){
        return 3;
      }else{
        return 5;
      }
    }
  }
  onClean() {
    this.facturasForm.reset();
  }

  onSave() {
    if (this.facturasForm.invalid) return;

    const formvalue = this.facturasForm.getRawValue();
    
    // Se realizara la inserción
    if (this.actionTODO == Action.NEW)  {
      const token= localStorage.getItem('token');
      var a= token?.toString()
      var newFactura: FacturaResponse = {
        rfc: formvalue.rfc,
        direccion: formvalue.direccion,
        cfid: formvalue.cfid,
        fechaFactura: formvalue.fechaFactura,
        token: a
      }

      this.facturasSvc.new(newFactura)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }  else { // se actualizan los datos

      var updatedFactura: FacturaResponse = {
        cveFactura: formvalue.cveFactura,
        rfc: formvalue.rfc,
        direccion: formvalue.direccion,
        cfid: formvalue.cfid,
        fechaFactura: formvalue.fechaFactura
      }

      this.facturasSvc.update(updatedFactura)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }
  }

  patchData() {
    if (this.data.facturas.cveFactura) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";
      this.facturasForm.patchValue({
        cveFactura: this.data?.facturas.cveFactura,
        rfc: this.data?.facturas.rfc,
        direccion: this.data?.facturas.direccion,
        cfid: this.data?.facturas.cfid,
        fechaFactura: this.data?.facturas.fechaFactura

      });
     

   
      
      this.facturasForm.updateValueAndValidity();
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }


}
