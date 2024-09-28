// importacion de dependencias y herramientas

import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos'; // importa la interfaz que contiene la estructura de los articulos

import { CrudService } from '../../services/crud.service'; // importa el servicio que maneja las operaciones de creación, lectura, actualización y eliminación (CRUD) de datos en la aplicación.

import { FormControl, FormGroup, Validators } from '@angular/forms'; // importa herramientas de angular material. Estos en particular son para la estructura de un formulario.

import Swal from 'sweetalert2'; // Alerta importada de una libreria.



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

  nombreImagen!: string; // obtendrá el nombre de la imagen

  imagen!: string; // obtendrá la ruta de la imagen

  //definimos formulario para los productos
  //atributos alfanumericos (string) se inicializan como comillas simples 
  //atributos numericos (number) se inicializan con cero 
  articulo = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
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
        imagen: '',
        alt: this.articulo.value.alt!,
      }
     // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
     await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
     .then(resp => {
       // encapsulamos respuesta y envíamos la información obtenida
       this.servicioCrud.obtenerUrlImagen(resp)
         .then(url => {
           // ahora método crearProducto recibe datos del formulario y URL creada
           this.servicioCrud.creararticulo(nuevoarticulo, url)
             .then(articulo => {
               alert("Ha agregado un nuevo producto con éxito.");
               // Resetea el formulario y las casillas quedan vacías
               this.articulo.reset();
             })
             .catch(error => {
               alert("Ha ocurrido un error al cargar un producto.");
               this.articulo.reset();
             })
         })
     })

    }


  }

 // CARGAR IMÁGENES
 cargarImagen(event: any){
  // Variable para obtener el archivo subido desde el input del HTML
  let archivo = event.target.files[0];
  // Variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
  let reader = new FileReader();
  if(archivo != undefined){
    /*
      Llamamos a método readAsDataURL para leer toda la información recibida
      Envíamos como parámetro al "archivo" porque será el encargador de tener la 
      info ingresada por el usuario
    */
    reader.readAsDataURL(archivo);
    // Definimos qué haremos con la información mediante función flecha
    reader.onloadend = () => {
      let url = reader.result;
      // Condicionamos según una URL existente y no "nula"
      if(url != null){
        // Definimos nombre de la imagen con atributo "name" del input
        this.nombreImagen = archivo.name;
        // Definimos ruta de la imagen según la url recibida
        this.imagen = url.toString();
      }
    }
  }
}
  mostrarBorrar(articuloSeleccionado: Articulos) {
    this.ModalVisiblearticulo = true

    this.articuloSeleccionado = articuloSeleccionado;
  }

  Borrararticulo() {
    this.servicioCrud.eliminar(this.articuloSeleccionado.idarticulo, this.articuloSeleccionado.imagen)
    
    .then(respuesta => {
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
    //  imagen: articuloSeleccionado.imagen,
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
      imagen: this.articuloSeleccionado.imagen,
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
      // Verificamos si el usuario ingresa o no una nueva imagen
    if(this.imagen){
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "articulos")
      .then(resp => {
        this.servicioCrud.obtenerUrlImagen(resp)
        .then(url =>{
          datos.imagen = url; // Actualizamos URL de la imagen en los datos del formulario
          this.actualizarProducto(datos); // Actualizamos los datos
          this.articulo.reset(); // Vaciar las casillas del formulario
        })
        .catch(error => {
          alert("Hubo un problema al subir la imagen :( \n"+error);
          this.articulo.reset();
        })
      })
    }else{
      /*
        Actualizamos formulario con los datos recibidos del usuario, pero sin 
        modificar la imagen ya existente en Firestore y en Storage
      */
      this.actualizarProducto(datos);
    }
  }
  // ACTUALIZAR la información ya existente de los productos
  actualizarProducto(datos: Articulos){
    // Enviamos al método el id del producto seleccionado y los datos actualizados
    this.servicioCrud.modificarrticulo(this.articuloSeleccionado.idarticulo, datos)
      .then(articulo => {
        alert("El articulo se ha modificado con éxito.");
      })
      .catch(error => {
        alert("Hubo un problema al modificar el articulo: \n" + error);
      })
  }
}
