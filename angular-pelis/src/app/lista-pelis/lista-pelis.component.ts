import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Peliulas} from '../models/Peliculas.model';
import { PelisApiClient} from '../models/pelis-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevaPeliAction } from '../models/peliculas-state.model';

@Component({
  selector: 'app-lista-pelis',
  templateUrl: './lista-pelis.component.html',
  styleUrls: ['./lista-pelis.component.css']
})
export class ListaPelisComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<Peliulas> = new EventEmitter();
  updates: string[]; 
  all;

  constructor(public pelisApiCLient: PelisApiClient, private store: Store<AppState>) {
    this.updates = [];
    this.store.select(state => state.peliculas.favorito)
      .subscribe( d => {
        if (d!=null) {
          this.updates.push("Se ha elegido a " + d.nombre)
        }
      })
      store.select(state => state.peliculas.items).subscribe(items => this.all = items);
    }

  ngOnInit(): void {
  }

  agregado(p: Peliulas) {
    this.pelisApiCLient.add(p);
    this.onItemAdded.emit(p);
  }
  elegido(e:Peliulas) {
    this.pelisApiCLient.elegir(e);
  }
  guardar(nombre:string, url:string):boolean {
  	let d = new Peliulas(nombre, url);
    this.pelisApiCLient.add(d);
    this.onItemAdded.emit(d);
    return false;
  }
}
