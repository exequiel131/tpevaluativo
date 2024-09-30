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

  //variable local para selecionar uun producto específico
  coleccionMateriales: Articulos [] = [];

//variable local para manejar estado de un modal 
  articuloSeleccionado!: Articulos;
  
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo 

  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.ArticulosCollection = articulo;

      this.mostrarArticuloMateriales();
    })
  }
  mostrarArticuloMateriales() {
    this.ArticulosCollection.forEach(articulo => {

      if (articulo.categoria === "Materiales") {

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
