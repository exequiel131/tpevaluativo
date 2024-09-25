import { Component } from '@angular/core';
import { CrudService } from '../admin/services/crud.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(public crudservice : CrudService){} 

  displayedColumns:string[]=['nombre','cantidad','preciounitario','subtotal','eliminar']

  actualizarSubtotal(item:any){
    this.crudservice.AgregarAlCarrito(item)
  }
  
  eliminarItem(item:any){
    this.crudservice.eliminarItem(item);
    this.crudservice.carritoscoleccion =[...this.crudservice.carritoscoleccion]
  }







  realizarCompra(){
    alert('Su compra ha sido exitosa')
  }
}
