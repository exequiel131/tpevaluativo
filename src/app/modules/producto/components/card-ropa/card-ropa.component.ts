import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-ropa',
  templateUrl: './card-ropa.component.html',
  styleUrls: ['./card-ropa.component.css']
})
export class CardRopaComponent {
 // Colección de todos los productos de forma local

 ArticulosCollection: Articulos[] = [];
 // Colección de productos de una sola categoría

 ropacolecction: Articulos[] = [];

 //variable local para selecionar uun producto espécioficio  
 articuloseleccionado!: Articulos;
 //variable local para manejar estado de un modal 
 modalvisible: boolean = false;

 // Patentamos de forma local el servicio para acceder en él
 constructor(public serviciocrud: CrudService) { }
 // Inicializa al momento que renderiza el componente

 ngOnInit(): void {
   // Accedemos a método 'obtenerProducto' y nos subscribimos a los cambios
   // recibimos notificación ante modificaciones

   this.serviciocrud.obtenerarticulo().subscribe(articulo => {

     this.ArticulosCollection = articulo;
     // Mostrará la colección de esa categoría hasta el momento

     this.mostrarArticuloSuplementos();
   })
 }
   // Función para filtrar los productos de tipo "alimentación"

 mostrarArticuloSuplementos() {
       // Iteramos colección de productos con un 'forEach'

   this.ArticulosCollection.forEach(articulo => {
     // Si es de tipo "alimentación" -> condicional

     if (articulo.categoria === "Ropa") {

               // Lo sube/ guarda en la colección de productos de tipo "alimentación"

       this.ropacolecction.push(articulo);
     }
   }
   )
 }
 mostrarver(info: Articulos) {

   this.modalvisible = true;

   this.articuloseleccionado = info;
 }
 cerrarver() {

  this.modalvisible = false;

  window.location.href = "/ropa"
}
}
