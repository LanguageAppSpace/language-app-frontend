export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  photo: string;
  birthday: Date;
}

export interface Lesson {
  title: string;
  description: string;
  phrasePairs: { phraseOne: string; phraseTwo: string }[];
}
