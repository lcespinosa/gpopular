import { TestBed } from '@angular/core/testing';

import { DemandCaseService } from './demand-case.service';

describe('DemandCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandCaseService = TestBed.get(DemandCaseService);
    expect(service).toBeTruthy();
  });
});
