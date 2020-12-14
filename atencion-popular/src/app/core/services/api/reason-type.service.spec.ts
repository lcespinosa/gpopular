import { TestBed } from '@angular/core/testing';

import { ReasonTypeService } from './reason-type.service';

describe('ReasonTypeService', () => {
  let service: ReasonTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
