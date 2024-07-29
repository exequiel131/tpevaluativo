import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/firestore.service';
import { Router } from '@angular/router';
//Importamos paqueteria de cirmptacion 
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router

  ) { }

  //importar la interfaz de usuario -> inicializar
  inicio: Usuario = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    uid: '',//-> inicializamos con comillas simples porque es string,si fuera nambuer se inicializa con 0
    rol: '',

  }

  //creamos coleccion de usuarios,tipo 'usuario'para arrays
  coleccionIniciosesion: Usuario[] = [];

  //funcion para el registro de nuevos usuarios
  async iniciarsesion() {
    /*
    //constante credencial va a reguardar la informacion que ingrese el usuario 
    const credenciales = {
      uid: this.inicio.uid,
      nombre: this.inicio.nombre,
      apellido: this.inicio.apellido,
      email:this.inicio.email,
      rol:this.inicio.rol,
      password:this.inicio.password
    }
    //Enviamos la nueva informacion como un nuevo objeto a la colecion de usuario
    this.coleccionIniciosesion.push(credenciales)
    // llamamos a los datos locales que esatn en registro
  const sUsuarioEncontrado = localStorage.getItem(credenciales.email)
  
  if(sUsuarioEncontrado){
    const oUsuarioEncontrado = JSON.parse(sUsuarioEncontrado)
    const contrasena = oUsuarioEncontrado.password
    console.log('contraseña ='+ contrasena)
    if(contrasena == credenciales.password)
      alert("Funciona")
      else{
        alert("no funciona")
      }
  } else{
    console.log('User date not found in local storage')
  }
  const compra = localStorage.getItem('contra')
  */
    const credenciales = {
      email: this.inicio.email,
      password: this.inicio.password
    }

    try {
      //obtenemos usuario de la BD 
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);
      //condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra coleccion
      if (!usuarioBD || usuarioBD.empty) {
     
//alertas personalizadas npm i sweetalert2 importamos lo primero que sale en el sitio web
        Swal.fire({
          title: "oh no!",
          text: "correo electronico no esta registrado",
          icon: "error"
        });    

        this.limpiar();
        return;
      }
      //vinculaba al primer docuemtno de la coleccion "usuario" que se obtenia desde la BD
      const usuarioDoc = usuarioBD.docs[0];

      //Extrae los datos del documento en forma de "objeto " y se especifica que va a ser del tipo 
      //"Usuario" (se refiere a la interfaz Usuario de nuestros modelos)
      const usuarioData = usuarioDoc.data() as Usuario

      // Encripta la contrase;a que el usuario envia mediante "iniciar seson"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();
      //Condicional que compara la contrase;a que acabamos de encriptar y que el usuario
      //envio con la que recibimos del "usuarioData"

      if (hashedPassword !== usuarioData.password) {

        Swal.fire({
          title: "oh no!",
          text: "Contraseña incorrecta",
          icon: "error"
        });    

        this.inicio.password = '';
        return
      }


      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          alert('Se pudo ingresar con exito !!!! :)');

          Swal.fire({
            title: "Buen trabajo!",
            text: "Se pudo ingresar con exito !!",
            icon: "success"
          });    

          this.servicioRutas.navigate(['/inicio']);
        })
        .catch(err => {
          alert('hubo un error al iniciar sesión:(' + err);
          Swal.fire({
            title: "oh no!",
            text: " hubo un error al iniciar sesión:( ",
            icon: "error"
          });    

          this.limpiar()
        })

    } catch (error) {
      this.limpiar();
    }



  }

  limpiar() {
    const inputs = {
      email: this.inicio.email,
      password: this.inicio.password
    }
  }

}