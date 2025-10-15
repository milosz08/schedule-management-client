export type ResetPasswordFormStage = 'send_token' | 'validate_token';

export type SetPasswordFormStage =
  | 'change_password'
  | 'success_change_password';
