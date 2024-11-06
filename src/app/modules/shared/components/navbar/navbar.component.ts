import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
logueado = true;
deslogueado = false ;


constructor (
  public servicioAuth: AuthService,
  public servicioRutas: Router,
  public crudservice: CrudService,
  private firestore: AngularFirestore

){}

ingresar(){
  this.logueado=false;
  this.deslogueado=true;
}

cerrarsesion (){
  this.deslogueado = false ;
  this.logueado = true ;

  this.servicioAuth.cerrarSesion();
  this.servicioRutas.navigate(['/'])
}

/*
//funcion cambiar fondo 
cambiarfondo(){
  //la barra sirve como un o
  let toggle  : HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
  let label_toggle : HTMLElement | null = document.getElementById('label_toggle') as HTMLInputElement

  if(toggle)
    {
    let checked : boolean = toggle.checked;
    document.body.classList.toggle('.dark',checked);

    if(checked){
      label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
        else{
          label_toggle.innerHTML = ' <i class="fa-solid fa-moon"></i> ';
        } 

  };
  
}*/

//Función cambiar fondo a oscuro
cambiarFondo(){
  let checkbox: HTMLInputElement | null = document.getElementById("checkbox") as HTMLInputElement

  if (checkbox) {
    let checked: boolean = checkbox.checked;
    document.body.classList.toggle('dark',checked)
  }
}

displayedColumns:string[]=['nombre','cantidad','preciounitario','eliminar']

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


allowedTerms: string[] = ['nike', 'pantalones', 'camiseta'];
filteredProducts: any[] = [];
noResults: boolean = false;


onSearch(searchTerm: string): void {
  const lowerCaseTerm = searchTerm.toLowerCase();

  if (this.allowedTerms.includes(lowerCaseTerm)) {
    this.firestore.collection('products', ref =>
      ref.where('nombre', '>=', lowerCaseTerm).where('nombre', '<=', lowerCaseTerm + '\uf8ff')
    ).valueChanges().subscribe(data => {
      this.filteredProducts = data;
      this.noResults = this.filteredProducts.length === 0;
    });
  } else {
    this.filteredProducts = [];
    this.noResults = true;
  }
}

}
