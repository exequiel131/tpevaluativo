import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-materiales',
  templateUrl: './card-materiales.component.html',
  styleUrls: ['./card-materiales.component.css']
})
export class CardMaterialesComponent {

  ArticulosCollection: Articulos[] = [];

  coleccionMateriales: Articulos [] = [];
  //variable local para selecionar uun producto espécioficio  
  articuloSeleccionado!: Articulos;
  //variable local para manejar estado de un modal 
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo 

  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.coleccionMateriales = articulo;

      this.mostrarArticuloGeneral();
    })
  }
  mostrarArticuloGeneral() {
    this.ArticulosCollection.forEach(articulo => {

      if (articulo.categoria === "materiales") {

        this.coleccionMateriales.push(articulo);
      }
    }
    )
  }
  mostrarver(info: Articulos) {

    this.modalvisible = true;

    this.articuloSeleccionado = info;
  }
}
