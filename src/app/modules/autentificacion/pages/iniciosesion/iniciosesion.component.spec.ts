import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciosesionComponent } from './iniciosesion.component';

describe('IniciosesionComponent', () => {
  let component: IniciosesionComponent;
  let fixture: ComponentFixture<IniciosesionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciosesionComponent]
    });
    fixture = TestBed.createComponent(IniciosesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
