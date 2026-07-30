export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  photoFile?: File;
  birthday: Date;
}

export interface PhrasePair {
  phraseOne: string;
  phraseTwo: string;
  id?: number;
  isLearned?: boolean;
}

export interface NewLesson {
  section: number | null;
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

export interface SectionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Section[];
}

export interface LessonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lesson[];
}
