import {
  PassWordChange,
  PhoneChange,
  PhoneInfo,
  ProfileChange,
  RoleChange,
} from '@/types/profile.types';
import axiosInstance from '@/utils/axios/axiosAPI';
import { client } from '@/utils/axios/clientAPI';

import { getSession } from 'next-auth/react';

export const getUserInfo = async () => {
  try {
    const session = await getSession();
    const trackName = session?.user.trackName;
    const trackRole = session?.user.trackRole;
    let period = session?.user.loginPeriod;

    // PM은 기수 0 고정
    if (trackRole === 'PM') {
      period = 0;
    }

    const res = await client.get(
      `/apis/v1/profile?trackName=${trackName}&period=${period}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePassword = async (password: PassWordChange) => {
  const { originPassword, newPassword } = password;

  try {
    const res = await client.patch(`/apis/v1/profile/password`, {
      originPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    throw new Error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updateRole = async (roleInfo: RoleChange) => {
  const { trackName, period: periodInt, trackRole } = roleInfo;

  try {
    const res = await client.post(`/apis/v1/role`, {
      trackName,
      period: Number(periodInt),
      trackRole,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한수정 요청에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updateProfileInfo = async (profileInfo: ProfileChange) => {
  const { profileImg } = profileInfo;

  try {
    const res = await client.patch(`/apis/v1/profile/img`, {
      profileImg,
    });
    return res.data;
  } catch (error) {
    throw new Error('프로필 수정에 실패했습니다. 다시 시도해주세요.');
  }
};

//해당트랙 이름의 기수조회
export const getTrackPeriodList = async (trackName: string) => {
  try {
    const res = await client.get(
      `/apis/v1/role/track/period?trackName=${trackName}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('기수 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//휴대폰 인증 전송
export const sendPhoneAuthNumber = async (userInfo: PhoneInfo) => {
  //유저이름 & 바꿀 휴대폰 번호
  const { username, phone } = userInfo;

  try {
    const res = await axiosInstance.post(`/apis/v1/users/auth/phone/send`, {
      username,
      phone,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 인증 전송에 실패했습니다. 다시 시도해주세요.');
  }
};

//휴대폰 인증 확인
export const checkPhoneAuth = async (userInfo: PhoneChange) => {
  //유저이름 & 바꿀 휴대폰 번호 & 인증번호
  const { username, phone, authCode } = userInfo;

  try {
    const res = await axiosInstance.post(`/apis/v1/users/auth/phone/valid`, {
      username,
      phone,
      authCode,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 인증번호 확인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePhoneNumber = async (phone: string) => {
  try {
    const res = await client.patch(`/apis/v1/profile/phone`, {
      phone,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};

//프로필 삭제
export const deleteUser = async () => {
  try {
    const res = await client.delete(`/apis/v1/users`);
    return res.data;
  } catch (error) {
    throw new Error('회원 탈퇴에 실패했습니다.');
  }
};

//내 권한 조회
export const getMyRole = async () => {
  try {
    const res = await client.get(`/apis/v1/role`);
    return res.data;
  } catch (error) {
    throw new Error('권한(트랙 및 기수) 조회에 실패했습니다.');
  }
};

//닉네임 변경
export const updateNickname = async (nickname: string) => {
  try {
    const res = await client.patch(`/apis/v1/profile/nickname`, {
      nickname,
    });
    return res.data;
  } catch (error) {
    throw new Error('닉네임 변경에 실패했습니다.');
  }
};
