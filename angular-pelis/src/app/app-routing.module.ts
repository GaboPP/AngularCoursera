import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPelisComponent} from '../app/components/lista-pelis/lista-pelis.component';
import { SalaComponent} from '../app/components/sala/sala.component';
import { LoginComponent} from '../app/components/login/login/login.component';
import { ProtectedComponent} from '../app/components/protected/protected/protected.component';
import { CinesComponentComponent } from './components/cines/cines-component/cines-component.component';
import { CinesMainComponentComponent } from './components/cines/cines-main-component/cines-main-component.component';
import { CinesMasInfoComponentComponent } from './components/cines/cines-mas-info-component/cines-mas-info-component.component';
import { CinesDetalleComponentComponent } from './components/cines/cines-detalle-component/cines-detalle-component.component';

import { AuthService} from '../app/services/auth.service';
import { UsuarioLogueadoGuard} from '../app/guards/usuario-logueado/usuario-logueado.guard';

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: CinesMainComponentComponent },
  { path: 'mas-info', component: CinesMasInfoComponentComponent },
  { path: ':id', component: CinesDetalleComponentComponent },
];
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaPelisComponent},
  { path: 'sala/:id', component: SalaComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  
  {
    path: 'cines',
    component: CinesComponentComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutesVuelos
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
