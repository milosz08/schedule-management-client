import { IsEditModePipe } from './is-edit-mode.pipe';

describe('IsEditModePipe', () => {
  it('create an instance', () => {
    const pipe = new IsEditModePipe();
    expect(pipe).toBeTruthy();
  });
});
