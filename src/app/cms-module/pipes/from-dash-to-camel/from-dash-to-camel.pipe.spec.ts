/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { FromDashToCamelPipe } from './from-dash-to-camel.pipe';

describe('FromDashToCamelPipe', () => {
  it('create an instance', () => {
    const pipe = new FromDashToCamelPipe();
    expect(pipe).toBeTruthy();
  });
});
