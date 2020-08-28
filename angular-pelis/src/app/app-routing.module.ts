import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPelisComponent} from '../app/lista-pelis/lista-pelis.component';
import { SalaComponent} from '../app/sala/sala.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaPelisComponent},
  { path: 'sala', component: SalaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
