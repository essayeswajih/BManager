import { TestBed } from '@angular/core/testing';

import { SteService } from './ste.service';

describe('SteService', () => {
  let service: SteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
