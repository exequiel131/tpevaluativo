import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';

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
  public servicioRutas: Router


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


}
