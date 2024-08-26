import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';

import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  //definimos coleccion de productos lcoales 
coleccionarticulo : Articulos[]=[];
//variable local para selecionar uun producto espécioficio  
articuloseleccionado! : Articulos;
//variable local para manejar estado de un modal 
modalvisible : boolean = false;

//inicializamos el servicio llamandolo  
constructor (public serviciocrud : CrudService){}
ngOnInit(): void {
this.serviciocrud.obtenerarticulo().subscribe(articulo =>{
  this.coleccionarticulo = articulo;

})
}
//funcion para mostrar mas informacion de los productops 
mostrarver (info : Articulos ){
  //cambio estado del mmodal a true ahora es visible 
  this.modalvisible = true ;

  //guardo en varible seleciionado kla informacion de producto elegico 
  this.articuloseleccionado = info ;
}
}

