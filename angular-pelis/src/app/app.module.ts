import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { ListaPelisComponent } from './lista-pelis/lista-pelis.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { SalaComponent } from './sala/sala.component';
import { FormPeliculasComponent } from './form-peliculas/form-peliculas.component';

import {PelisApiClient} from './models/pelis-api-client.model';
import {PeliculasState, reducerPeliculas, intializePeliculasState, PelisEffects} from './models/peliculas-state.model';

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
@NgModule({
  declarations: [
    AppComponent,
    ListaPelisComponent,
    CarteleraComponent,
    SalaComponent,
    FormPeliculasComponent
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
  ],
  providers: [PelisApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
