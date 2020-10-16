import { TestBed } from '@angular/core/testing';

import { CpopularsService } from './cpopulars.service';

describe('CpopularsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpopularsService = TestBed.get(CpopularsService);
    expect(service).toBeTruthy();
  });
});
