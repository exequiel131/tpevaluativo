import { CanActivateFn } from '@angular/router';

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  return true;
};
