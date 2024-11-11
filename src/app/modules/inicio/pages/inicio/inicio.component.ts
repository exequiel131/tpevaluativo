/*import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

}

*/
import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  colecciongeneral: Articulos[] = [];
  //variable local para selecionar un producto espécifico 
  articuloseleccionado!: Articulos;
  //variable local para manejar estado de un modal 
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo  
  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.colecciongeneral = articulo;

      this.mostrarArticuloGeneral();
    })
  }
  mostrarArticuloGeneral() {
    this.colecciongeneral.forEach(articulo => {

      if (articulo.categoria === "general") {

        this.colecciongeneral.push(articulo);
      }
    }
    )
  }
  mostrarver(info: Articulos) {

    this.modalvisible = true;

    this.articuloseleccionado = info;

    console.log('Imagen clickeada:', info); // Añadir esta línea para depuración

  }
  actualizarSubtotal(item:any){
    this.serviciocrud.AgregarAlCarrito(item)
  }

  // Métodos para incrementar y decrementar cantidad en el carrito
incrementarCantidad(item: any) {
  if (item.cantidad < 20) {
    item.cantidad++;
    this.actualizarSubtotal(item);
  }
}

decrementarCantidad(item: any) {
  if (item.cantidad > 1) {
    item.cantidad--;
    this.actualizarSubtotal(item);
  }
}
}
  

