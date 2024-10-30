import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//importaciones
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatMenuModule} from '@angular/material/menu';

import {MatTable, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

//import { ServicesComponent } from './services/services.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
   FormsModule,
    
  ],
  
   //metadato
   exports:[
    NavbarComponent,
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ]
})
export class SharedModule { }
