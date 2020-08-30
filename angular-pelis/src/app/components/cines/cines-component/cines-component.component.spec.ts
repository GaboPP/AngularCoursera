import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinesComponentComponent } from './cines-component.component';

describe('CinesComponentComponent', () => {
  let component: CinesComponentComponent;
  let fixture: ComponentFixture<CinesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
