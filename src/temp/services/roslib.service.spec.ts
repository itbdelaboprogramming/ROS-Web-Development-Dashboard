import { TestBed } from '@angular/core/testing';

import { RoslibService } from './roslib.service';

describe('RoslibService', () => {
  let service: RoslibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoslibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
