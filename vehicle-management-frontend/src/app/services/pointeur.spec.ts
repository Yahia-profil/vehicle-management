import { TestBed } from '@angular/core/testing';

import { Pointeur } from './pointeur';

describe('Pointeur', () => {
  let service: Pointeur;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pointeur);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
