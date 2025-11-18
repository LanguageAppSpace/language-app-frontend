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
  isLearned?: boolean;
}

export interface NewLesson {
  title: string;
  description: string;
  phrasePairs: PhrasePair[];
}

export interface Lesson extends NewLesson {
  id: string;
  progress?: number;
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

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Section extends NewSection {
  id: number;
  progress: string;
  lessons: Lesson[];
}

export interface NewSection {
  title: string;
  description?: string;
  color: string;
}

export interface UpdateSectionPayload extends NewSection {
  id: number;
}
