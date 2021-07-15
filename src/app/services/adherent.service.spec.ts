import { TestBed } from '@angular/core/testing';

import { AdherentService } from './adherent.service';

describe('AdherentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdherentService = TestBed.get(AdherentService);
    expect(service).toBeTruthy();
  });
});
