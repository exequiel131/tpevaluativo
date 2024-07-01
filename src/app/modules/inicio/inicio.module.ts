import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
//vistas de pagina
import { InicioComponent } from './pages/inicio/inicio.component';
//componente local
import { CardComponent } from './card/card.component';

//componentes d e material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    InicioComponent,
    CardComponent
    
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule

  ],
  exports : [
    InicioComponent,
    CardComponent,
  ]
})
export class InicioModule { }
