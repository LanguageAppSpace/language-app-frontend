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

export interface PhrasePair {
  phraseOne: string;
  phraseTwo: string;
  id?: number;
}

export interface NewLesson {
  title: string;
  description: string;
  phrasePairs: PhrasePair[];
}

export interface Lesson extends NewLesson {
  id: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
