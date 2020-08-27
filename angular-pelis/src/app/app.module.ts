import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPelisComponent } from './lista-pelis/lista-pelis.component';
import { CarteleraComponent } from './cartelera/cartelera.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPelisComponent,
    CarteleraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
