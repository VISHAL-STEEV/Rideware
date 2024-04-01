import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPopUpComponent } from './group-pop-up.component';

describe('GroupPopUpComponent', () => {
  let component: GroupPopUpComponent;
  let fixture: ComponentFixture<GroupPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
