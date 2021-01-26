import { TestBed } from '@angular/core/testing';

import { ProsesService } from './proses.service';

describe('ProsesService', () => {
  let service: ProsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
