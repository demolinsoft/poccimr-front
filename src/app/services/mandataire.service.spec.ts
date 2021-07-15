import { TestBed } from '@angular/core/testing';

import { MandataireService } from './mandataire.service';

describe('MandataireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MandataireService = TestBed.get(MandataireService);
    expect(service).toBeTruthy();
  });
});
