import { TestBed } from '@angular/core/testing';

import { ReproductionListsService } from './reproduction-lists-service';

describe('ReproductionListsService', () => {
  let service: ReproductionListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproductionListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
