import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import Dexie from 'dexie';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListaPelisComponent } from './components/lista-pelis/lista-pelis.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { SalaComponent } from './components/sala/sala.component';
import { FormPeliculasComponent } from './components/form-peliculas/form-peliculas.component';

import {PeliculasState, reducerPeliculas, intializePeliculasState, PelisEffects, InitMyDataAction} from './models/peliculas-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { CinesComponentComponent } from './components/cines/cines-component/cines-component.component';
import { CinesMainComponentComponent } from './components/cines/cines-main-component/cines-main-component.component';
import { CinesMasInfoComponentComponent } from './components/cines/cines-mas-info-component/cines-mas-info-component.component';
import { CinesDetalleComponentComponent } from './components/cines/cines-detalle-component/cines-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { Peliulas } from './models/Peliculas.model';
import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { EspiameDirective } from './espiame.directive';
import { TrackearClickDirective } from './trackear-click.directive';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

// redux init
export interface AppState {
  peliculas: PeliculasState;
}

const reducers: ActionReducerMap<AppState> = {
  peliculas: reducerPeliculas
}

const reducersInitialState = {
  peliculas: intializePeliculasState()
}
//redux finish

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
// fin app init

// dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<Peliulas, number>;
  translations: Dexie.Table<Translation, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl'
      });
      this.version(2).stores({
        destinos: '++id, nombre, imagenUrl',
        translations: '++id, lang, key, value'
      });
  }
}

export const db = new MyDatabase();
// fin dexie db


// i18n ini
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
                      .where('lang')
                      .equals(lang)
                      .toArray()
                      .then(results => {
                                        if (results.length === 0) {
                                          return this.http
                                            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/api/translation?lang=' + lang)
                                            .toPromise()
                                            .then(apiResults => {
                                              db.translations.bulkAdd(apiResults);
                                              return apiResults;
                                            });
                                        }
                                        return results;
                                      }).then((traducciones) => {
                                        console.log('traducciones cargadas:');
                                        console.log(traducciones);
                                        return traducciones;
                                      }).then((traducciones) => {
                                        return traducciones.map((t) => ({ [t.key]: t.value}));
                                      });
    /*
    return from(promise).pipe(
      map((traducciones) => traducciones.map((t) => { [t.key]: t.value}))
    );
    */
   return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ListaPelisComponent,
    CarteleraComponent,
    SalaComponent,
    FormPeliculasComponent,
    LoginComponent,
    ProtectedComponent,
    CinesComponentComponent,
    CinesMainComponentComponent,
    CinesMasInfoComponentComponent,
    CinesDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState,
    }),
    EffectsModule.forRoot([PelisEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    HttpClientModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }}),
      NgxMapboxGLModule,
      BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
