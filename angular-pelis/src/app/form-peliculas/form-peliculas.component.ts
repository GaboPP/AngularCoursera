import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Peliulas } from '../models/Peliculas.model';
import { FormGroup, FormBuilder, Validators, Form, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { ajax, AjaxResponse} from 'rxjs/ajax';

@Component({
  selector: 'app-form-peliculas',
  templateUrl: './form-peliculas.component.html',
  styleUrls: ['./form-peliculas.component.css']
})
export class FormPeliculasComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<Peliulas>;
  fg: FormGroup;
  minLong: number = 3;
  searchResults: string[];

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
                Validators.required,
                this.nombreValidator,
                this.nombreValidatorParametrizable(this.minLong)
      ])],
      url: ['']
    });
    this.fg.valueChanges.subscribe((form: any) => {
      // console.log('cambió el form: ', form);
    })
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200), //stop por 0.2 seg para no recibir palabras tan rápido y hacer computo inecesario
        distinctUntilChanged(), // ignorar hasta que sea una palabra distinta a la anterior procesada
        switchMap(() => ajax('/assets/datos.json')) //simular la consulta de un webservice
      ).subscribe(AjaxResponse => {
        console.log(elemNombre.value);
        console.log(AjaxResponse.response);
        console.log(AjaxResponse.response.filter(peli => peli.includes(elemNombre.value)));
        this.searchResults = AjaxResponse.response.filter(peli => peli.includes(elemNombre.value));
      });
  }
  guardar(nombre: string, url: string): boolean {
    let p = new Peliulas(nombre, url);
    this.onItemAdded.emit(p);
    return false
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
    let l = control.value.toString().trim().length;
    if (l>0 && l<5) {
      return { invalidNombre: true };
    }
    return 
  }
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s: string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if (l>0 && l<minLong) {
        return { minLongNombre: true };
      }
      return null;
    }
  }

}
