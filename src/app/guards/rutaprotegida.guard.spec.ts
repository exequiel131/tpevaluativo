import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rutaprotegidaGuard } from './rutaprotegida.guard';

describe('rutaprotegidaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rutaprotegidaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
