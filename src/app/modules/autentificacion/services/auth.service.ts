import { Injectable } from '@angular/core';
//Servicio en la nube de autentificacion de firebase 
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';

//observables para obtener cambios
import { Observable } from 'rxjs';

//itera coleccion leyendo informacion actual
import { map } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//propiedad privada para guardar rol de usuario 
  private rolusuario : string | null = null;
  //Referenciar auth de firebase en el servicio
  constructor(
    private auth: AngularFireAuth, 
    private servicioFirestore :AngularFirestore,
   ) { }

  //FUNCION PARA REGISTRO
  registrar(email: string, password: string) {
    //retorna el valor que es creado con el metodo "createUser"
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  //FUNCION PARA INICIO DE SESIÓN

  iniciarSesion(email: string, password: string) {
    //validar la iformacion del usario -> saber si existe en la coleccion 
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  //FUNCIO  N PARA CERRAR SESIÓN
  cerrarSesion() {
    //  devuelve una promesa vacía -> qiota token 
    return this.auth.signOut();
  }

  //FUNCION PARA TOMAR UID
    
  async obtenerUid(){
    //Nos va a generar una promesa y la constante la va a capturar 
    const user = await this.auth.currentUser;
    /* 
    Si el usuario no respeta la estructura de la interfaz /
    Si tuvo problemas para el registro -> ej: mal internte
    */
    if(user == null){
      return null;
    }else{
      return user.uid;
    }
  }  

  obtenerUsuario(email:string){
    /*
    retornamos del servicioFirestore la coleccion de 'usuarios', buscamos una refenrencia en los emails registrados
    y los comparamos con los que ingrese el usuairo al iniciar sesion, y lo obtiene con el '.get()'
    lo vuelve una promesa => de un resultado resuelto o rechazado 
    
    */ 
    return this.servicioFirestore.collection('usuarios',ref => ref.where('email','==',email)).get().toPromise();



  }

//funcion para detener el rol de usuario                                                    
obtenerRol (uid : string ):Observable <string | null > {
  //accedemos a la coleccion de usuarios, buscando por UID, obteniendo cambios en valores al enviar info por tuberia, "mapeamos"
 //la coleccion , obtenemos un usuario especifico y buscamos su atributo "rol", aun si este es nulo. 

  return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
  .pipe(map((usuario : any) => usuario ? usuario.rol : null ) )
}

//envia el rol obtenido 
Setusuario(rol : string){
this.rolusuario = rol ;

}

//obtener el rol y asignarlo a rol de la variable local
getUsuarioRol():string | null {
  return this.rolusuario;
}

}