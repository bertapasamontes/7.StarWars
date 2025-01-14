import { TestBed } from '@angular/core/testing';

import { PageNumberService } from './page-number.service';

describe('PageNumberService', () => {
  let service: PageNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
