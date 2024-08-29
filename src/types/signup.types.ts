export type CheckListType = {
  id: string;
  label: string;
  isChecked: boolean;
  link?: string;
};

export type SelectOptionType = {
  value: string;
  label: string;
  selected: boolean;
};

export type emailUniqueResponseType = {
  status: string;
  message: string;
  data: false;
};

export enum OAuthEnum {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
}

export enum GenderEnum {
  NONE = 'NONE',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum UserRoleEnum {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum signupModalType {
  MANAGER = 'MANAGER',
  USER = 'USER',
}
