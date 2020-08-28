import { Peliulas } from './Peliculas.model';
import { AppState } from '../app.module';
import { Store} from '@ngrx/store';
import { NuevaPeliAction, ElegidoFavoritoAction } from './peliculas-state.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PelisApiClient {
    constructor(private store: Store<AppState>) {
    }
    add(p: Peliulas) {
        this.store.dispatch( new NuevaPeliAction(p));
    }
    elegir(p: Peliulas) {
        this.store.dispatch( new ElegidoFavoritoAction(p));
    }
}