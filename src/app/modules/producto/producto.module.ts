import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';

import { CardComponent } from './components/card/card.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SuplementosComponent } from './pages/suplementos/suplementos.component';
import { CardSuplementosComponent } from './components/card-suplementos/card-suplementos.component';

import { CalzadoComponent } from './pages/calzado/calzado.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { CardCalzadoComponent } from './components/card-calzado/card-calzado.component';
import { CardRopaComponent } from './components/card-ropa/card-ropa.component';
import { CardMaterialesComponent } from './components/card-materiales/card-materiales.component';
import { RopaComponent } from './pages/ropa/ropa.component';

@NgModule({
  declarations: [
    ProductoComponent,
    CardComponent,
    ProductoComponent,

    SuplementosComponent,
    CardSuplementosComponent,

    CalzadoComponent,
    CardCalzadoComponent,

    MaterialesComponent,
    CardMaterialesComponent,

    CardRopaComponent,
    RopaComponent,

  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports : [
    ProductoComponent,
    CardComponent,
    CardSuplementosComponent,
    CardRopaComponent,
  ]
})
export class ProductoModule { }
