import { TestBed } from '@angular/core/testing';

import { DonneeService } from './donnee.service';

describe('DonneeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonneeService = TestBed.get(DonneeService);
    expect(service).toBeTruthy();
  });
});
