import { Peliulas } from './Peliculas.model';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { Store} from '@ngrx/store';
import { NuevaPeliAction, ElegidoFavoritoAction } from './peliculas-state.model';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class PelisApiClient {
    pelis: Peliulas[] = [];
    constructor(
        public store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) public config: AppConfig,
        public http: HttpClient
      ) {
        this.store
          .select(state => state.peliculas)
          .subscribe((data) => {
            console.log('destinos sub store');
            console.log(data);
            this.pelis = data.items;
          });
        this.store
          .subscribe((data) => {
            console.log('all store');
            console.log(data);
          });
      }
    
    add(p: Peliulas) {
        const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
        const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: p.nombre }, { headers: headers });
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
          if (data.status === 200) {
            this.store.dispatch(new NuevaPeliAction(p));
            const myDb = db;
            myDb.destinos.add(p);
            console.log('todos los destinos de la db!');
            myDb.destinos.toArray().then(destinos => console.log(destinos))
          }
        });
      }
    elegir(p: Peliulas) {
        this.store.dispatch( new ElegidoFavoritoAction(p));
    }
    getById(id: String): Peliulas {
        this.store.select(state => state.peliculas.items).subscribe(items => this.pelis = items);
        this.pelis.forEach(p => {
            console.log(p)
        })
      return this.pelis.filter(p => { return p.id.toString() === id; })[0];
    }
}