import { TestBed } from '@angular/core/testing';

import { StreetService } from './street.service';

describe('StreetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StreetService = TestBed.get(StreetService);
    expect(service).toBeTruthy();
  });
});
