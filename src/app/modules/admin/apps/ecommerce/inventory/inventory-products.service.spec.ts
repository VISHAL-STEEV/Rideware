import { TestBed } from '@angular/core/testing';

import { InventoryProductsService } from './inventory-products.service';

describe('InventoryProductsService', () => {
  let service: InventoryProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
