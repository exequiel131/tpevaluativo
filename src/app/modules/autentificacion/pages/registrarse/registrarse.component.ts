import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

//importamos servicio de autentificacion 
import { AuthService } from '../../services/auth.service';

//importamos el servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
//import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';

// importamos componente de rutas de angular 
import { Router } from '@angular/router';

//Importamos paqueteria de cirmptacion 
import * as CryptoJS from 'crypto-js';

import { FormsModule } from '@angular/forms';

//paqueteria de alertas personalizadas
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistroComponent {

  //input de la contraseña para ver los caracteres o no 
  hide = true;
  // ################################################################################# Importaciones de interfaz ''
  //importar la interfaz de usuario -> inicializar
  usuario: Usuario = {
    uid: '',//-> inicializamos con comillas simples porque es string,si fuera nambuer se inicializa con 0
    nombre: '',
    apellido: '',
    email: '',
    rol: 'vis',
    password: ''
  }
  //##################################################################################### fin de la importacion

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  //creamos coleccion de usuarios,tipo 'usuario'para arrays
  coleccionUsuario: Usuario[] = [];



  //funcion para el registro de nuevos usuarios
  async registrar() {
    // Limpia espacios en blanco de los campos de email y password
    const email = this.usuario.email.trim();
    const password = this.usuario.password.trim();

    // Validación de email con una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Oh no!",
        text: "El formato del correo electrónico es incorrecto.",
        icon: "error"
      });
      return; // Salimos de la función si el formato es incorrecto
    }

       // Agregamos console.log para depurar el valor de email y password
       console.log("Email a registrar:", email);
       console.log("Password a registrar:", password);


    /*Registro con servicio de AUTH
    const credenciales = {
      email: email,
      password: password
    };*/

    try {
        // Llamada al servicio de registro de Firebase
        const res = await this.servicioAuth.registrar(email, password);


      // Registro exitoso
      Swal.fire({
        title: "Buen Trabajo!",
        text: "Se pudo registrar con éxito!",
        icon: "success"
      });

      // Redirige al inicio
      this.servicioRutas.navigate(['/inicio']);

      // Almacena el UID del usuario registrado
      const uid = await this.servicioAuth.obtenerUid();
      this.usuario.uid = uid;

      /* Hash de la contraseña para seguridad antes de guardar
      this.usuario.password = CryptoJS.SHA256(password).toString();*/

      // Guarda el usuario en Firestore
      await this.guardarUsuario();
      this.servicioRutas.navigate(['/inicio']);
      
      // Limpia el formulario
      this.limpiar();

    } catch (error) {
      Swal.fire({
        title: "Oh no!",
        text: "Ocurrió un error al registrar un nuevo usuario :( \n" + error,
        icon: "error"
      });
    }
  }

  async guardarUsuario() {
    try {
      await this.servicioFirestore.agregarUsuario(this.usuario, this.usuario.uid);
      console.log("Usuario guardado en Firestore:", this.usuario);
    } catch (err) {
      console.error("Error al guardar el usuario en Firestore:", err);
    }
  }


  //funcion que limpia los imputs
  limpiar() {
    //en constantes "imputs" llamamos a los atributos y los inicializamos como vacios (string ='',namber=0)
    const inputs = {
      uid: this.usuario.uid = '',
      nombre: this.usuario.nombre = '',
      apellido: this.usuario.apellido = '',
      email: this.usuario.email = '',
      rol: this.usuario.rol = 'vis',
      password: this.usuario.password = '',
    }


  }
}