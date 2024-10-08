export interface USERPROFILE {
  email: string;
  username: string;
  profileImg: string;
  phone: string;
  trackName: string;
  trackRole: string;
  period: string;
}

export interface GETUSER {
  trackName: string;
  period: string;
}

export interface UserInfoProps {
  username: string;
  trackName: string;
  period: string;
  trackRole: string;
  profileImg: string;
  nickname: string;
  handleChangeImage: () => void;
  handleChangeRole: () => void;
  handleChangeNickname: () => void;
}

export interface AccountInfoProps {
  email: string;
  phone: string;
  handleChangePassword: () => void;
  handleChangePhoneNumber: () => void;
}

//모달
export interface ChangeModalProps {
  onClose: () => void;
}

export interface PhoneChangeModalProps {
  onClose: () => void;
  username: string;
}

export interface RoleChangeModalProps {
  trackRole: string;
  onClose: () => void;
}

export interface RandomProfileModalProps {
  onClose: () => void;
  profileImg: string;
  trackRole: string;
}

//api
export interface PassWordChange {
  originPassword: string;
  newPassword: string;
}

export interface RoleChange {
  trackName?: string;
  period?: string;
  trackRole?: string;
}

export interface ProfileChange {
  profileImg: string;
}

export interface PhoneInfo {
  username: string;
  phone: string;
}

export interface PhoneChange {
  username: string;
  phone: string;
  authCode: string;
}
