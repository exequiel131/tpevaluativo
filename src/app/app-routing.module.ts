import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

import { NosotrosComponent } from './modules/nosotros/nosotros.component';

import { ResetPasswordComponent } from './modules/autentificacion/pages/reset-password/reset-password.component';

//guardian de la vista del administrador
import { rutaprotegidaGuard } from './guards/rutaprotegida.guard';
import { TallesComponent } from './modules/talles/talles.component';

const routes: Routes = [

  { path: "", component: InicioComponent },
  
  { path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) },

  {path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule) },

  { path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m =>m.AutentificacionModule) },

  { path: "", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) ,
    //definimos al guardian que proteja la rut ade admin y que espere un rol de tipo "admin"
  canActivate: [rutaprotegidaGuard],data : {role : 'admin'} },

  { path: "",loadChildren: ()=> import('./modules/carrito/carrito.module').then(m => m.CarritoModule)},


  { path: 'sobre-nosotros', component: NosotrosComponent },

  { path: 'inicio-sesion', component: InicioComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' },
  
  { path: 'talles', component: TallesComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
                                                                                