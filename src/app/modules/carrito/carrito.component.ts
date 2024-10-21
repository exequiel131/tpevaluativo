import { Component } from '@angular/core';
import { CrudService } from '../admin/services/crud.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(public crudservice : CrudService){} 

  displayedColumns:string[]=['imagen','nombre','cantidad','preciounitario','eliminar']

  actualizarSubtotal(item:any){
    this.crudservice.AgregarAlCarrito(item)
  }
  
  eliminarItem(item:any){
    this.crudservice.eliminarItem(item);
    this.crudservice.carritoscoleccion =[...this.crudservice.carritoscoleccion]
  }





//personalizacion de alerta proximamente modal para pagar los productos
  realizarCompra(){
    Swal.fire({
      title: "Buen trabajo!",
      text: "Se pudo realizar la compra con exito !!",
      icon: "success"
    }); 
  }
}
