import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalzadoComponent } from './card-calzado.component';

describe('CardCalzadoComponent', () => {
  let component: CardCalzadoComponent;
  let fixture: ComponentFixture<CardCalzadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCalzadoComponent]
    });
    fixture = TestBed.createComponent(CardCalzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
