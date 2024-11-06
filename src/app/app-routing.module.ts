import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

import { NosotrosComponent } from './modules/nosotros/nosotros.component';

import { ResetPasswordComponent } from './modules/autentificacion/pages/reset-password/reset-password.component';

//rutas perezosas

const routes: Routes = [

  { path: "", component: InicioComponent },
  
  { path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) },

  {path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule) },

  { path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m =>m.AutentificacionModule) },

  { path: "", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },

  { path: "",loadChildren: ()=> import('./modules/carrito/carrito.module').then(m => m.CarritoModule)},


  { path: 'sobre-nosotros', component: NosotrosComponent },

  { path: 'inicio-sesion', component: InicioComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
                                                                                