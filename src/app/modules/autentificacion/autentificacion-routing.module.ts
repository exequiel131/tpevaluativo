import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from '../inicio/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path:"registro",component:RegistroComponent
  },
  {
    path:"Iniciar Sesion",component:InicioComponent
  }
  
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class autentificacionRoutingModule { }
  