import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinesDetalleComponentComponent } from './cines-detalle-component.component';

describe('CinesDetalleComponentComponent', () => {
  let component: CinesDetalleComponentComponent;
  let fixture: ComponentFixture<CinesDetalleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinesDetalleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinesDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
