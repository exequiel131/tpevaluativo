import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

//ruta padre
const routes: Routes = [

  { path: "", component: InicioComponent },
  
  { path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) },

  {path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
                                                                                