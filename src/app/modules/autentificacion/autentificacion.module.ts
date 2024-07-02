import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { IniciosesionComponent } from './pages/iniciosesion/iniciosesion.component';


@NgModule({
  declarations: [
    RegistrarseComponent,
    IniciosesionComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule
  ]
})
export class AutentificacionModule { }
