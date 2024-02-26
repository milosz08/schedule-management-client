/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserHoverInfoPipe } from './user-hover-info.pipe';

describe('UserHoverInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new UserHoverInfoPipe();
    expect(pipe).toBeTruthy();
  });
});
