import { Component } from '@angular/core';
import { Articulos } from 'src/app/models/articulos';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  public info:Articulos[];

  //
  constructor(){
  this.info = [
  {
    id:"",
    nombre:"televisores",
    imagen:"https://arbghprod.vtexassets.com/arquivos/ids/163073-1600-1600?v=638319588618470000&width=1600&height=1600&aspect=true",
    alt:""
  },
  {
    id:"",
    nombre:"",
    imagen:"https://www.lg.com/ar/images/televisores/md06198056/gallery/des_1_n.jpg",
    alt:""
  },
  {
    id:"",
    nombre:"",
    imagen:"",
    alt:""
  },
  ]
  }
}
