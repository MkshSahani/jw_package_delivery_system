import { TestBed } from '@angular/core/testing';

import { UserlogincheckGuard } from './userlogincheck.guard';

describe('UserlogincheckGuard', () => {
  let guard: UserlogincheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserlogincheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
