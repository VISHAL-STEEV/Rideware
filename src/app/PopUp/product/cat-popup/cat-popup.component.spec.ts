import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPopupComponent } from './cat-popup.component';

describe('CatPopupComponent', () => {
  let component: CatPopupComponent;
  let fixture: ComponentFixture<CatPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
