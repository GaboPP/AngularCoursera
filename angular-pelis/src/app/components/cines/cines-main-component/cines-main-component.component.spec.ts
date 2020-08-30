import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinesMainComponentComponent } from './cines-main-component.component';

describe('CinesMainComponentComponent', () => {
  let component: CinesMainComponentComponent;
  let fixture: ComponentFixture<CinesMainComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinesMainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinesMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
