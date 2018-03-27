import { TestBed, inject } from '@angular/core/testing';

import { BookLendingService } from './book-lending.service';

describe('BookLendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookLendingService]
    });
  });

  it('should be created', inject([BookLendingService], (service: BookLendingService) => {
    expect(service).toBeTruthy();
  }));
});
