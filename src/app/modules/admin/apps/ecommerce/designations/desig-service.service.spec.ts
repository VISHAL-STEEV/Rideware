import { TestBed } from '@angular/core/testing';

import { DesigServiceService } from './desig-service.service';

describe('DesigServiceService', () => {
  let service: DesigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
