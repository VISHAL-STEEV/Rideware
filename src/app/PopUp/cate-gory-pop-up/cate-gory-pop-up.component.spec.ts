import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateGoryPopUpComponent } from './cate-gory-pop-up.component';

describe('CateGoryPopUpComponent', () => {
  let component: CateGoryPopUpComponent;
  let fixture: ComponentFixture<CateGoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CateGoryPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CateGoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
