import { IsCreationModePipe } from './is-creation-mode.pipe';

describe('IsCreationModePipe', () => {
  it('create an instance', () => {
    const pipe = new IsCreationModePipe();
    expect(pipe).toBeTruthy();
  });
});
