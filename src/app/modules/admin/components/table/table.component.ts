import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';

import { CrudService } from '../../services/crud.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //creamos coleccion local de productos --> la definimos como array
  collectionarticulo: Articulos[] = [];
  //creacion de variables
  //signo de exclamacion para recibir valores vacios 
  //esta variable es para 
  articuloSeleccionado!: Articulos;

  ModalVisiblearticulo: boolean = false;


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


  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {

    // 6/8/24 
    this.servicioCrud.obtenerarticulo().subscribe(articulo => {
      this.collectionarticulo = articulo;
    })



  }
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
          Swal.fire({
            title: "bien!",
            text: "ha agregado un nuevo producto con exito",
            icon: "success"
          });
        })
        .catch(error => {
          Swal.fire({
            title: "oh no!",
            text: "ha ocurrido un error al cargar un nuevoproducto",
            icon: "error"
          });
        })

    }


  }

  mostrarBorrar(articuloSeleccionado: Articulos) {
    this.ModalVisiblearticulo = true

    this.articuloSeleccionado = articuloSeleccionado;
  }

  Borrararticulo() {
    this.servicioCrud.eliminar(this.articuloSeleccionado.idarticulo).then(respuesta => {
      Swal.fire({
        title: "bien!",
        text: "se elimino el producto con exito",
        icon: "success"
      });
    })
      .catch(error => {
        Swal.fire({
          title: "error!",
          text: "ha ocurrido un error al eliminar el producto",
          icon: "error"
        });
      }

      )
  }
  /*toma los valores del producto seleccionado y los vas 
  autoxcompletar en el formulario del modal menos el id*/
  // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrareditar(articuloSeleccionado: Articulos) {
    this.articuloSeleccionado = articuloSeleccionado;

    this.articulo.setValue({
      nombre: articuloSeleccionado.nombre,
      precio: articuloSeleccionado.precio,
      descripcion: articuloSeleccionado.descripcion,
      categoria: articuloSeleccionado.categoria,
      imagen: articuloSeleccionado.imagen,
      alt: articuloSeleccionado.alt
    })
  }

  editarproducto() {
    let datos: Articulos = {
      //solo id producto no se modifica por el usuario 
      idarticulo: this.articuloSeleccionado.idarticulo,
      //los demas atributos reciben nueva informacion desde el usuario
      nombre: this.articulo.value.nombre!,
      precio: this.articulo.value.precio!,
      descripcion: this.articulo.value.descripcion!,
      categoria: this.articulo.value.categoria!,
      imagen: this.articulo.value.imagen!,
      alt: this.articulo.value.alt!,
    }
    this.servicioCrud.modificarrticulo(this.articuloSeleccionado.idarticulo, datos)
      .then(articulo => {
        Swal.fire({
          title: "bien!",
          text: "se edito el producto con exito",
          icon: "success",
        });
        this.articulo.reset();
      })
      .catch(error => {
        Swal.fire({
          title: "error!",
          text: "error añ editar el producto",
          icon: "error"
        });
        this.articulo.reset();
      })
  }
}