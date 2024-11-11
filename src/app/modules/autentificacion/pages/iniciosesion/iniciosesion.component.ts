import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;
  resetEmail: string = ''; // Variable para el email del formulario de restablecimiento

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  inicio: Usuario = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    uid: '',
    rol: ''
  }

  coleccionIniciosesion: Usuario[] = [];

  // Función para iniciar sesión de los usuarios
  async iniciarsesion() {
    const credenciales = {
      email: this.inicio.email,
      password: this.inicio.password
    };

    try {
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Correo electrónico no está registrad.",
          icon: "error"
        });
        this.limpiar();
        return;
      }

      const usuarioDoc = usuarioBD.docs[0];
      const usuarioData = usuarioDoc.data() as Usuario;
  

      await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password);
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "Se pudo ingresar con éxito.",
        icon: "success"
      });
      this.servicioRutas.navigate(['/inicio']);

    } catch (error) {
      this.limpiar();
    }
  }


  limpiar() {
    this.inicio.email = '';
    this.inicio.password = '';
  }
}
