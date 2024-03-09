/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { RoleToViewPipe } from './role-to-view.pipe';

describe('RoleToViewPipe', () => {
  it('create an instance', () => {
    const pipe = new RoleToViewPipe();
    expect(pipe).toBeTruthy();
  });
});
