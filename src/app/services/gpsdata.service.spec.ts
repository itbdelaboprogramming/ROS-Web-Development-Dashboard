import { TestBed } from '@angular/core/testing';

import { GpsdataService } from './gpsdata.service';

describe('GpsdataService', () => {
  let service: GpsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
