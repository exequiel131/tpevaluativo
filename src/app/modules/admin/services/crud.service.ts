import { Injectable } from '@angular/core';
import { Articulos } from 'src/app/models/articulos'; //importamos la intefaz 

//importaciones de la base de datos
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //nuestro crud service puede crear, editar, eliminar y obtener productos
  private ArticulosCollection: AngularFirestoreCollection<Articulos>

  constructor(private database: AngularFirestore) {
    this.ArticulosCollection = database.collection('articulos');

  }

  
  creararticulo(articulo: Articulos) {
    //promise es una funcion que devuelve un valor sea verdadero o rechazado
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numero de identificacion para el articulo en la base de datos
        const idarticulo = this.database.createId();
        //asdignamos id creado al atributo idarticulo de la inbterfaz articulos
        articulo.idarticulo = idarticulo;

        const resultado = await this.ArticulosCollection.doc(idarticulo).set(articulo);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

//snapshotchanges toma una captura del estado de los datos 
//pipe son tuberias que retornan un nuevo arreglo 
//map mapea o recorre esa nueva informacion 
//a resguarda la nueva informacion y la envia como un documento

//accedemos a la collecion con punto concadenamnos la acion 
   obtenerarticulo(){
    return this.ArticulosCollection.snapshotChanges().pipe(map(Action =>Action.map ( a => a.payload.doc.data())))
   }
}
