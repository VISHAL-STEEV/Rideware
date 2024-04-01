import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCategoriesComponent } from './unit-categories.component';

describe('UnitCategoriesComponent', () => {
  let component: UnitCategoriesComponent;
  let fixture: ComponentFixture<UnitCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
