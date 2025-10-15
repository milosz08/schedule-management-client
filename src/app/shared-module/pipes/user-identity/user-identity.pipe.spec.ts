import { UserIdentityPipe } from './user-identity.pipe';

describe('UserIdentityPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdentityPipe();
    expect(pipe).toBeTruthy();
  });
});
