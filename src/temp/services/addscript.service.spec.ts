import { TestBed } from '@angular/core/testing';

import { AddscriptService } from './addscript.service';

describe('AddscriptService', () => {
  let service: AddscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
