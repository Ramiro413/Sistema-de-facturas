import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';
import { MaterialModule } from '@app/material.module';
import { FacturasDialogComponent } from './components/facturas-dialog/facturas-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataPipe } from '@app/shared/utils/data.pipes';



@NgModule({
  declarations: [
    FacturasComponent,
    FacturasDialogComponent,
    DataPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FacturasRoutingModule,
    MaterialModule
  ]
})
export class FacturasModule { }
