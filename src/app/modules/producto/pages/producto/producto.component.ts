import { Component } from '@angular/core';

import { Articulos } from 'src/app/models/articulos';

//import { Input , Output } from '@angular/core';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  //stringue mo}dificara elm valor del input en el componenet hijo

  articulo: string = '';
  //inicializo con tipo streing y vacio 

  //coleccion de productos añadidos a la lista 
  articulocarrousel: Articulos[] = [];

  articuloanadido(articulo: Articulos) {
    //apostrofes se suelen usar en interpolacion
    this.articulo = ' $(articulo.nombre) : $$(articulo.precio)';

    try {
      this.articulocarrousel.push(articulo);

      Swal.fire({
        title: "Buen Trabajo!",
        text: " ha añadido el producto con exito ",
        icon: "info"
      });
    }
    catch (error) {
      Swal.fire({
        title: "oh no!",
        text: " ha ocurrido un error\n" + error,
        icon: "error"
      });
    };
    //agregamos la informacion recibida por el parametro de la funcion a la coleccion  de carrousel 
  }
}
