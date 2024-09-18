import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { ProductoModule } from './producto.module';
import { SuplementosComponent } from './pages/suplementos/suplementos.component';
import { RopaComponent } from './pages/ropa/ropa.component';
import { CalzadoComponent } from './pages/calzado/calzado.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';

const routes: Routes = [
  {
    path:"producto",component:GeneralComponent
  },
  {
    path:"suplementos",component:SuplementosComponent
  },
  {
    path:"ropa",component:RopaComponent
  },
  {
    path:"calzado",component:CalzadoComponent
  },
  {
    path:"materiales",component:MaterialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
