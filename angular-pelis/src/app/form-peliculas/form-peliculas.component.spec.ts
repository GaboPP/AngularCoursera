import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPeliculasComponent } from './form-peliculas.component';

describe('FormPeliculasComponent', () => {
  let component: FormPeliculasComponent;
  let fixture: ComponentFixture<FormPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
