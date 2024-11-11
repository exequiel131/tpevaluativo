import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiatallesComponent } from './guiatalles.component';

describe('GuiatallesComponent', () => {
  let component: GuiatallesComponent;
  let fixture: ComponentFixture<GuiatallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiatallesComponent]
    });
    fixture = TestBed.createComponent(GuiatallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
