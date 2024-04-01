import { TestBed } from '@angular/core/testing';

import { DepartmentServService } from './department-serv.service';

describe('DepartmentServService', () => {
  let service: DepartmentServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
