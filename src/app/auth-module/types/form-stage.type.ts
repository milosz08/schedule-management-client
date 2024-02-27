/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type ResetPasswordFormStage = 'send_token' | 'validate_token';

export type SetPasswordFormStage =
  | 'change_password'
  | 'success_change_password';
