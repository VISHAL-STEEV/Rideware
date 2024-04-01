import { TestBed } from '@angular/core/testing';

import { PurchaseServService } from './purchase-serv.service';

describe('PurchaseServService', () => {
  let service: PurchaseServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
