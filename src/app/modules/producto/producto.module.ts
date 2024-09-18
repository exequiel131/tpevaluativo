import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { GeneralComponent } from './pages/general/general.component';

import { CardComponent } from './components/card/card.component';
import { CardGeneralComponent } from './components/card-general/card-general.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SuplementosComponent } from './pages/suplementos/suplementos.component';
import { RopaComponent } from './pages/ropa/ropa.component';
import { CalzadoComponent } from './pages/calzado/calzado.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { CardCalzadoComponent } from './components/card-calzado/card-calzado.component';
import { CardMaterialesComponent } from './components/card-materiales/card-materiales.component';
import { CardRopaComponent } from './components/card-ropa/card-ropa.component';
import { CardSuplementosComponent } from './components/card-suplementos/card-suplementos.component';

@NgModule({
  declarations: [
    ProductoComponent,
    GeneralComponent,
    CardComponent,
    CardGeneralComponent,
    ProductoComponent,
    SuplementosComponent,
    RopaComponent,
    CalzadoComponent,
    MaterialesComponent,
    CardCalzadoComponent,
    CardMaterialesComponent,
    CardRopaComponent,
    CardSuplementosComponent
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
