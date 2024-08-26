import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { GeneralComponent } from './pages/general/general.component';

import { CardComponent } from './components/card/card.component';
import { CardGeneralComponent } from './components/card-general/card-general.component';
import { ProductoComponent } from './pages/producto/producto.component';

@NgModule({
  declarations: [
    ProductoComponent,
    GeneralComponent,
    CardComponent,
    CardGeneralComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports : [
    ProductoComponent,
    GeneralComponent,
    CardComponent,
    CardGeneralComponent
  ]
})
export class ProductoModule { }
