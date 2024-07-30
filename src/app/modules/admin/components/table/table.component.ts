import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';

import { CrudService } from '../../services/crud.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //creamos coleccion local de productos --> la definimos como array
  collectionarticulo: Articulos[] = [];

  //definimos formulario para los productos
  //atributos alfanumericos (string) se inicializan como comillas simples 
  //atributos numericos (number) se inicializan con cero 
  articulo = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })


  constructor(public servicioCrud: CrudService) {

  }

}
