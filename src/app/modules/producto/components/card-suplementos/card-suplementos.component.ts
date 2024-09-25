import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-suplementos',
  templateUrl: './card-suplementos.component.html',
  styleUrls: ['./card-suplementos.component.css']
})
export class CardSuplementosComponent {

  ArticulosCollection: Articulos[] = [];

  coleccionSuplementos: Articulos [] = [];

  //variable local para selecionar uun producto espécioficio  
  articuloSeleccionado!: Articulos;

  //variable local para manejar estado de un modal 
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo  
  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.ArticulosCollection = articulo;

      this.mostrarArticuloSuplementos();
    })
  }
  mostrarArticuloSuplementos() {
    this.ArticulosCollection.forEach(articulo => {

      if (articulo.categoria === "Suplementos") {

        this.coleccionSuplementos.push(articulo);
      }
    }
    )
  }
  mostrarver(info: Articulos) {

    this.modalvisible = true;

    this.articuloSeleccionado = info;
  }
}
