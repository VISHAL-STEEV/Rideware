import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrchaseReqComponent } from './new-prchase-req.component';

describe('NewPrchaseReqComponent', () => {
  let component: NewPrchaseReqComponent;
  let fixture: ComponentFixture<NewPrchaseReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPrchaseReqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPrchaseReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
