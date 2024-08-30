import { GenderEnum, OAuthEnum, UserRoleEnum } from '@/types/signup.types';

class SignupUserForm {
  oAuthType: OAuthEnum;
  email: string;
  password: string;
  username: string;
  birth: string;
  phone: string;
  gender: GenderEnum;
  profileImg: string;
  nickname: string;
  userRole: UserRoleEnum;
  termUserAge: boolean;
  termUseService: boolean;
  termPersonalInfo: boolean;
  termAdvertisement: boolean;

  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    username: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    profileImg: string,
    nickname: string,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    this.oAuthType = oAuthType;
    this.email = email;
    this.password = password;
    this.username = username;
    this.birth = birth;
    this.phone = phone;
    this.gender = gender;
    this.profileImg = profileImg;
    this.nickname = nickname;
    this.userRole = userRole;
    this.termUserAge = termUserAge;
    this.termUseService = termUseService;
    this.termPersonalInfo = termPersonalInfo;
    this.termAdvertisement = termAdvertisement;
  }
}

export class Admin extends SignupUserForm {
  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    username: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    profileImg: string,
    nickname: string,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    super(
      oAuthType,
      email,
      password,
      username,
      birth,
      phone,
      gender,
      profileImg,
      nickname,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
    );
  }
}

export class User extends SignupUserForm {
  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    username: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    profileImg: string,
    nickname: string,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    super(
      oAuthType,
      email,
      password,
      username,
      birth,
      phone,
      gender,
      profileImg,
      nickname,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
    );
  }
}
