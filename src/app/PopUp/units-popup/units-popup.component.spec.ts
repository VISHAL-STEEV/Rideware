import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsPopupComponent } from './units-popup.component';

describe('UnitsPopupComponent', () => {
  let component: UnitsPopupComponent;
  let fixture: ComponentFixture<UnitsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
