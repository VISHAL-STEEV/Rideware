import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListPoPUpComponent } from './price-list-po-pup.component';

describe('PriceListPoPUpComponent', () => {
  let component: PriceListPoPUpComponent;
  let fixture: ComponentFixture<PriceListPoPUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceListPoPUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceListPoPUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
