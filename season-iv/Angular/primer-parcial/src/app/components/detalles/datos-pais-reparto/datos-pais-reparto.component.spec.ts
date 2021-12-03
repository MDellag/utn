import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPaisRepartoComponent } from './datos-pais-reparto.component';

describe('DatosPaisRepartoComponent', () => {
  let component: DatosPaisRepartoComponent;
  let fixture: ComponentFixture<DatosPaisRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPaisRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPaisRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
