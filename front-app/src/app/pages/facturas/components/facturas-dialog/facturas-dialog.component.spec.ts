import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasDialogComponent } from './facturas-dialog.component';

describe('FacturasDialogComponent', () => {
  let component: FacturasDialogComponent;
  let fixture: ComponentFixture<FacturasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
