import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { ProductoModule } from './producto.module';
import { SuplementosComponent } from './pages/suplementos/suplementos.component';

const routes: Routes = [
  {
    path:"producto",component:GeneralComponent
  },
  {
    path:"suplementos",component:SuplementosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
