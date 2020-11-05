import { TestBed } from '@angular/core/testing';

import { WayService } from './way.service';

describe('WayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WayService = TestBed.get(WayService);
    expect(service).toBeTruthy();
  });
});
