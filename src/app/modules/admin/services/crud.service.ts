import { Injectable } from '@angular/core';
import { Articulos } from 'src/app/models/articulos'; //importamos la intefaz 

//importaciones de la base de datos
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

//importaciones para manejjo de archivos y referencias 
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

//la primera importancion es para oobtener la url de descarga de una imagen subida 
//getStorage para obtener la instancia de almacenamiento 
//ref para crear referencias a ubicaciones en el almacenamiento }
//uploadresult tipo que rerpresennta el resultado de una operacion subida
//uploadstring para sbuir imagen¿es en formate cadena 
//deleteobject para eliminar un espacio en el almacenamiento 

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //nuestro crud service puede crear, editar, eliminar y obtener productos
  private ArticulosCollection: AngularFirestoreCollection<Articulos>
  //definimos VARIABLE RESPUESTA QUE PODRA SUBIR RESULTADOS
  private respuesta!: UploadResult;
  //inicializar servicio de storage 
  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    this.ArticulosCollection = database.collection('articulos');

  }

  //CREAR ARTICULO 
  creararticulo(articulo: Articulos, url:string ) {
    //promise es una funcion que devuelve un valor sea verdadero o rechazado
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numero de identificacion para el articulo en la base de datos
        const idarticulo = this.database.createId();
        //asdignamos id creado al atributo idarticulo de la inbterfaz articulos
        articulo.idarticulo = idarticulo; 
        //asignamos url recibida del parametro al atributo imagen de interfaz producto 
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
  modificarrticulo(idArticulo: string, nuevadata: Articulos) {
    return this.database.collection('articulos').doc(idArticulo).update(nuevadata);

  }

  //ELIMINAR PRODUCTOS
  eliminar(idArticulo: string, imagenUrl : string) {
    return new Promise((resolve, reject) => {
      try {

//definimos referencias localmente de storage
        const storage = getStorage();

//obntiene la refrencia desde el almacenamiento de storage 
        const referenciaImagen = ref(storage, imagenUrl)

deleteObject(referenciaImagen)
.then(()=>{
  const respuesta = this.ArticulosCollection.doc(idArticulo).delete();
  resolve(respuesta);
})

.catch(error => {
  reject("Error al eliminar la imagen : \n"+error );
})
      } 
      catch (error) {
        reject(error);
      }
    })



  }
  //obtener url de imagenes
  obtenerURLimagen(respuesta: UploadResult) {
    //retorna url obtenmido como referencia
    return getDownloadURL(respuesta.ref);
  }

  //Subir imagenes con sus referencias
  /**
   * 
   * @param {string} nombre //nombre de la imagen
   * @param {any} imagen   //tipo de imagenes que se pueden subir 
   * @param {string} ruta  //ruta de almacenamiento de las imagenes
   * @return //se retorna lo obtenido 
   */
  async subirimagen(nombre: string, imagen: any, ruta: string) {
    try {

      //crear una imagen de referencia
      //accede a storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      //asignarla a la respuesta la informacion de las imagenes subidas
      this.respuesta = await uploadString(referenciaImagen, nombre, 'data_url')

        .then(resp => {
          return resp;
        })
      return this.respuesta
    }
    catch (error) {
      console.log(error);

      return this.respuesta
    }


  }
}


