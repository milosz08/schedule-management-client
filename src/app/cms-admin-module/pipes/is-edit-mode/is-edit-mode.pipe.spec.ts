/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { IsEditModePipe } from './is-edit-mode.pipe';

describe('IsEditModePipe', () => {
  it('create an instance', () => {
    const pipe = new IsEditModePipe();
    expect(pipe).toBeTruthy();
  });
});
