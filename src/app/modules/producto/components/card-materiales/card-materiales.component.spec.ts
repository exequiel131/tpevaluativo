import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaterialesComponent } from './card-materiales.component';

describe('CardMaterialesComponent', () => {
  let component: CardMaterialesComponent;
  let fixture: ComponentFixture<CardMaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMaterialesComponent]
    });
    fixture = TestBed.createComponent(CardMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
