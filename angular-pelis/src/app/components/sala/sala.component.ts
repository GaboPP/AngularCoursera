import { Component, OnInit, InjectionToken, Inject, Injectable } from '@angular/core';
import { PelisApiClient } from './../../models/pelis-api-client.model';
import { Peliulas } from './../../models/Peliculas.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

class PelisApiClientViejo {
  getById(): Peliulas {
    console.log("api vieja!");
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable()
class PelisApiClientDecorated extends PelisApiClient {
  constructor(@Inject(APP_CONFIG) public config: AppConfig, store: Store<AppState>, public http: HttpClient){
    super(store, config, http);
  }
  getById(id: String): Peliulas {
    console.log("llamdo por la clase decorada!");
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css'],
  providers: [
    PelisApiClient,
  // {provide: PelisApiClientViejo, useExisting: PelisApiClient}
  {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
  {provide: PelisApiClient, useClass: PelisApiClientDecorated },
  {provide: PelisApiClientViejo, useExisting: PelisApiClient },

]
})
export class SalaComponent implements OnInit {
  peliculas: Peliulas;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };

  constructor(private route: ActivatedRoute, private pelisApiClient: PelisApiClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.peliculas = this.pelisApiClient.getById(id);
  }

}