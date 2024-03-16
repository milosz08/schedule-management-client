/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { IsCreationModePipe } from './is-creation-mode.pipe';

describe('IsCreationModePipe', () => {
  it('create an instance', () => {
    const pipe = new IsCreationModePipe();
    expect(pipe).toBeTruthy();
  });
});
