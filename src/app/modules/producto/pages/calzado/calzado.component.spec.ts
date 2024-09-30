import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalzadoComponent } from './calzado.component';

describe('CalzadoComponent', () => {
  let component: CalzadoComponent;
  let fixture: ComponentFixture<CalzadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalzadoComponent]
    });
    fixture = TestBed.createComponent(CalzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
