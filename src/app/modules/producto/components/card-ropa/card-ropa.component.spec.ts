import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRopaComponent } from './card-ropa.component';

describe('CardRopaComponent', () => {
  let component: CardRopaComponent;
  let fixture: ComponentFixture<CardRopaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRopaComponent]
    });
    fixture = TestBed.createComponent(CardRopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
