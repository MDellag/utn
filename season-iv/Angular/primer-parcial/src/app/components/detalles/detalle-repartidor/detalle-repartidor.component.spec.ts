import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepartidorComponent } from './detalle-repartidor.component';

describe('DetalleRepartidorComponent', () => {
  let component: DetalleRepartidorComponent;
  let fixture: ComponentFixture<DetalleRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRepartidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
