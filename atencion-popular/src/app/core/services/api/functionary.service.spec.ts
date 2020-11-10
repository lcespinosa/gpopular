import { TestBed } from '@angular/core/testing';

import { FunctionaryService } from './functionary.service';

describe('FunctionaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionaryService = TestBed.get(FunctionaryService);
    expect(service).toBeTruthy();
  });
});
