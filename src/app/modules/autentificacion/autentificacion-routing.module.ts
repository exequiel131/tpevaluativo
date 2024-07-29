import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registrarse/registrarse.component';
import { IniciosesionComponent } from './pages/iniciosesion/iniciosesion.component';

const routes: Routes = [
  {
    path:"registro",component:RegistroComponent
  },
  {
    path:"iniciosesion",component:IniciosesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutentificacionRoutingModule { }
