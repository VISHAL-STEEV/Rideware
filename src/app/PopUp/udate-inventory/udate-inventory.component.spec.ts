import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdateInventoryComponent } from './udate-inventory.component';

describe('UdateInventoryComponent', () => {
  let component: UdateInventoryComponent;
  let fixture: ComponentFixture<UdateInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdateInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UdateInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
