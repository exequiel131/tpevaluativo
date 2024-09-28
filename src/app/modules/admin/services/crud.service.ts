import { Injectable } from '@angular/core';
import { Articulos } from 'src/app/models/articulos'; //importamos la intefaz 

//importaciones de la base de datos
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map } from 'rxjs';

import { Action } from 'rxjs/internal/scheduler/Action';

import Swal from 'sweetalert2';

import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Definir variable "respuesta" que podrá subir resultados
  private respuesta!: UploadResult;
  // Inicializar servicio de Storage
  private storage = getStorage();

  //nuestro crud service puede crear, editar, eliminar y obtener productos
  private ArticulosCollection: AngularFirestoreCollection<Articulos>

  //COLECCION DE CARROS DE COMPRAS
  private Carritoscoleccion: AngularFirestoreCollection<Articulos>

  constructor(private database: AngularFirestore) {
    this.ArticulosCollection = database.collection('articulos');

//CARRO DE COMPRAS 
    this.Carritoscoleccion = database.collection('articulos')
  }

  //CREAR ARTICULO 
  creararticulo(articulo: Articulos, url: string) {
    //promise es una funcion que devuelve un valor sea verdadero o rechazado
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numero de identificacion para el articulo en la base de datos
        const idarticulo = this.database.createId();
        //asdignamos id creado al atributo idarticulo de la inbterfaz articulos
        articulo.idarticulo = idarticulo;

        // Asignamos URL recibida del parámetro al atributo "imagen" de interfaz Producto
        articulo.imagen = url;
        const resultado = await this.ArticulosCollection.doc(idarticulo).set(articulo);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  //OBTENER PRODUCTO
  //tenemos nuestra coleccion
  //snapshotchanges toma una captura del estado de los datos 
  //pipe son tuberias que retornan un nuevo arreglo 
  //transformarla en un nuevo valor
  //map mapea o recorre esa nueva informacion 
  //a resguarda la nueva informacion y la envia como un documento

  //accedemos a la collecion con punto concadenamnos la acion 
  obtenerarticulo() {
    return this.ArticulosCollection.snapshotChanges().pipe(map(Action => Action.map(a => a.payload.doc.data())))
  }
 
  //EDITAR PRODUCTO
modificarrticulo(idArticulo : string, nuevadata : Articulos){
return this.database.collection('articulos').doc(idArticulo).update(nuevadata);

}
 
eliminar(idArticulo: string, imagenUrl: string) {
  return new Promise((resolve, reject) => {
      try {
          const referenciaImagen = ref(this.storage, imagenUrl);
          deleteObject(referenciaImagen)
              .then(() => {
                  this.ArticulosCollection.doc(idArticulo).delete()
                      .then(() => {
                          resolve("Artículo eliminado con éxito.");
                      })
                      .catch(err => reject("Error al eliminar el artículo: " + err));
              })
              .catch(err => reject("Error al eliminar la imagen: " + err));
      } catch (error) {
          reject("Error al eliminar: " + error);
      }
  });
}


   // OBTENER url de imágenes
   obtenerUrlImagen(respuesta: UploadResult){
    // Retorna URL obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }
  /**
   * PARÁMETROS DEFINIDOS
   * @param {string} nombre <- nombre de la imagen
   * @param {any} imagen <- tipo de imágenes que se pueden subir (extension)
   * @param {string} ruta <- ruta de almacenamiento de las imágenes
   * @returns <- se retorna lo obtenido
   */
  // SUBIR imágenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string){
    try{
      // Crear una referencia de imagen:
      // accede a Storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);
      // Asignarle a la respuesta la información de las imágenes subidas
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
      .then(resp => {
        return resp;
      })
      return this.respuesta;
    }
    catch(error){
      console.log(error);
      return this.respuesta;
    }
  }

//CARRITO DE COMPRAS
  carritoscoleccion: any[] = [];

cantidadItemCarrito: number = 0;

total: number = 0;

CalcularTotal() {
  this.total = 0; // Reiniciar el total antes de calcular
  this.carritoscoleccion.forEach((element) => {
    element.subtotal = element.precio * element.cantidad;
    this.total += element.subtotal;
  });
  this.total = +this.total.toFixed(2); // Redondear a dos decimales
}

// Función para agregar o actualizar la cantidad de un producto

AgregarAlCarrito(item: any) {
  const index = this.carritoscoleccion.findIndex(
    (element) => element.nombre === item.nombre
  );

  if (index !== -1) {
    // Si el producto ya existe en el carrito, actualiza la cantidad directamente
    this.carritoscoleccion[index].cantidad = item.cantidad;
    if (this.carritoscoleccion[index].cantidad <= 0) {
      this.eliminarItem(this.carritoscoleccion[index]); // Eliminar si la cantidad es 0 o menos
    }
  } else {
    // Si el producto no existe, agregar al carrito
    const nuevoElemento = {
      ...item,
      cantidad: item.cantidad > 0 ? item.cantidad : 1, // Asegurar que al menos tenga una cantidad positiva
    };
    this.carritoscoleccion.push(nuevoElemento);
  }

  this.cantidadItemCarrito = this.carritoscoleccion.length;
  this.CalcularTotal();

  Swal.fire({
    title: "Buen Trabajo!",
    text: "se pudo agregar el producto al carrito!",
    icon: "success"
  });   
}


// Función para eliminar un producto del carrito
eliminarItem(item: any) {
  const index = this.carritoscoleccion.indexOf(item);
  if (index !== -1) {
    this.carritoscoleccion.splice(index, 1); // Eliminar el producto del array
  }
  this.cantidadItemCarrito = this.carritoscoleccion.length; // Actualizar la cantidad de items en el carrito
  this.CalcularTotal(); // Recalcular el total después de eliminar
}





  
  }






