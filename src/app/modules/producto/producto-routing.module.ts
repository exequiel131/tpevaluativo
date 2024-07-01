import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { ProductoModule } from './producto.module';

const routes: Routes = [
  {
    path:"producto",component:GeneralComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
