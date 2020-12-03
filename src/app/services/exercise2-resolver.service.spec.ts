import { TestBed } from '@angular/core/testing';

import { Exercise2ResolverService } from './exercise2-resolver.service';

describe('Exercise2ResolverService', () => {
  let service: Exercise2ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exercise2ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
