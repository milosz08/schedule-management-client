/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserIdentityPipe } from './user-identity.pipe';

describe('UserIdentityPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdentityPipe();
    expect(pipe).toBeTruthy();
  });
});
