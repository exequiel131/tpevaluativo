import { CanActivateFn } from '@angular/router';

import { inject, Inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

//operadores tippo "obersavbles"
import{ map, switchMap, of , from} from 'rxjs';

export const rutaprotegidaGuard: CanActivateFn = (route, state) => {

//inyecxtables intancias servicio de autentificacion en el guardain (forma local)
const serviceAuth = Inject (AuthService);

//inyectamos servicio de rutas de forma local 
const servicioRutas = inject (Router);

//especificamos cual es el rol que va a esperar el guardian para activarse 
const rolesperado = "admin";

  return true;
};
