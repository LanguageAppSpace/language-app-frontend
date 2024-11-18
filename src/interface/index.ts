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

export interface PhrasePairs {
  phraseOne: string;
  phraseTwo: string;
}

export interface NewLesson {
  title: string;
  description: string;
  phrasePairs: PhrasePairs[];
}

export interface Lesson extends NewLesson {
  id: string;
}
