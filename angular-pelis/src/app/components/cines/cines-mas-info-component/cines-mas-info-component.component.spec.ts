import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinesMasInfoComponentComponent } from './cines-mas-info-component.component';

describe('CinesMasInfoComponentComponent', () => {
  let component: CinesMasInfoComponentComponent;
  let fixture: ComponentFixture<CinesMasInfoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinesMasInfoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinesMasInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
