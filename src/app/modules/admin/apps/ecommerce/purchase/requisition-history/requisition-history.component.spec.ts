import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionHistoryComponent } from './requisition-history.component';

describe('RequisitionHistoryComponent', () => {
  let component: RequisitionHistoryComponent;
  let fixture: ComponentFixture<RequisitionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitionHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisitionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
