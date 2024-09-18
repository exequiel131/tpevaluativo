import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-ropa',
  templateUrl: './card-ropa.component.html',
  styleUrls: ['./card-ropa.component.css']
})
export class CardRopaComponent {

  ArticulosCollection: Articulos[] = [];

  coleccionRopa: Articulos[] = [];

  //variable local para selecionar uun producto espécioficio  
  articuloSeleccionado!: Articulos;

  //variable local para manejar estado de un modal 
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo  
  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.coleccionRopa = articulo;

      this.mostrarArticuloGeneral();
    })
  }
  mostrarArticuloGeneral() {
    this.ArticulosCollection.forEach(articulo => {

      if (articulo.categoria === "ropa") {

        this.coleccionRopa.push(articulo);
      }
    }
    )
  }
  mostrarver(info: Articulos) {

    this.modalvisible = true;

    this.articuloSeleccionado = info;
  }
}
