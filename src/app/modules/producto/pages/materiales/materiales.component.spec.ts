import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesComponent } from './materiales.component';

describe('MaterialesComponent', () => {
  let component: MaterialesComponent;
  let fixture: ComponentFixture<MaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesComponent]
    });
    fixture = TestBed.createComponent(MaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
