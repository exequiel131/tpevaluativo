import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuplementosComponent } from './card-suplementos.component';

describe('CardSuplementosComponent', () => {
  let component: CardSuplementosComponent;
  let fixture: ComponentFixture<CardSuplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSuplementosComponent]
    });
    fixture = TestBed.createComponent(CardSuplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
