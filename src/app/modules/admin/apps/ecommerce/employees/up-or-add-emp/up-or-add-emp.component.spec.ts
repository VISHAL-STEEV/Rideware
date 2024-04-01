import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpOrAddEmpComponent } from './up-or-add-emp.component';

describe('UpOrAddEmpComponent', () => {
  let component: UpOrAddEmpComponent;
  let fixture: ComponentFixture<UpOrAddEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpOrAddEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpOrAddEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
