export interface PasswordData {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ProfileData {
  first_name: string;
  last_name: string;
  photo?: string;
  birthday: Date;
}
