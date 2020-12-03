import { TestBed } from '@angular/core/testing';

import { Exercise1ResolverService } from './exercise1-resolver.service';

describe('Exercise1ResolverService', () => {
  let service: Exercise1ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exercise1ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
