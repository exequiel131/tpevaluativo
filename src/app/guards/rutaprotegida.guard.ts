import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

//operadores tippo "obersavbles"
import { map, switchMap, of, from } from 'rxjs';

export const rutaprotegidaGuard: CanActivateFn = (route, state) => {

  //inyecxtables intancias servicio de autentificacion en el guardain (forma local)
  const serviceAuth = inject(AuthService);

  //inyectamos servicio de rutas de forma local 
  const servicioRutas = inject(Router);

  //especificamos cual es el rol que va a esperar el guardian para activarse 
  const rolesperado = "admin";

  return from(serviceAuth.obtenerUid()).pipe(
    switchMap(uid => {
      if (uid) {
        return serviceAuth.obtenerRol(uid).pipe(
          map(rol => {
            if (rol === rolesperado) {
              console.log("usuario verificado como administrador.")
              return true;
            } else {
              return false;
            }
          })
        )
      } else {
        console.log("usuario no validado. permisos insuficientes")
        //redireccionamos acceso al inicio para usuarios no validados
        //usuario sin permisos visitante o no registrado

        return of(servicioRutas.createUrlTree(['/inicio']));
      }
    })
  )
}
