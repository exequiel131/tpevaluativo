import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-card-general',
  templateUrl: './card-general.component.html',
  styleUrls: ['./card-general.component.css']
})
export class CardGeneralComponent {

  ArticulosCollection: Articulos[] = [];

  coleccionGeneral: Articulos[] = [];
  //variable local para selecionar uun producto espécioficio  
  articuloSeleccionado!: Articulos;
  //variable local para manejar estado de un modal 
  modalvisible: boolean = false;

  //inicializamos el servicio llamandolo  
  constructor(public serviciocrud: CrudService) { }

  ngOnInit(): void {

    this.serviciocrud.obtenerarticulo().subscribe(articulo => {

      this.coleccionGeneral = articulo;

      this.mostrarArticuloGeneral();
    })
  }
  mostrarArticuloGeneral() {
    this.ArticulosCollection.forEach(articulo => {

      if (articulo.categoria === "general") {

        this.coleccionGeneral.push(articulo);
      }
    }
    )
  }
  mostrarver(info: Articulos) {

    this.modalvisible = true;

    this.articuloSeleccionado = info;
  }
}
