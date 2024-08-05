import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';

import { CrudService } from '../../services/crud.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __await } from 'tslib';




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
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })


  constructor(public servicioCrud: CrudService) {

  }
  ngOnInit(): void { }
  async agregarproducto() {
    if (this.articulo.valid) {
      let nuevoarticulo: Articulos = {
        idarticulo: '',
        nombre: this.articulo.value.nombre!,
        precio: this.articulo.value.precio!,
        descripcion: this.articulo.value.descripcion!,
        categoria: this.articulo.value.categoria!,
        imagen: this.articulo.value.imagen!,
        alt: this.articulo.value.alt!,
      }
      await this.servicioCrud.creararticulo(nuevoarticulo)
        .then(producto => {
          alert("ha agregado un nuevo producto con exito");
        })
        .catch(error => {
          alert("ha ocurrido un error al cargar un nuevoproducto");
        })

    }


  }
}
