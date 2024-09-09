import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SIGNUP_QUERY_KEYS } from '../api/signup/keys.constant';
import axiosAPI from '@/utils/axios/axiosAPI';

export interface PhoneInfo {
  username: string;
  phone: string;
}

export interface PhoneChange {
  username: string;
  phone: string;
  authCode: string;
}

//휴대폰 인증 전송
export const sendPhoneAuthNumber = async (userInfo: PhoneInfo) => {
  //유저이름 & 바꿀 휴대폰 번호
  const { username, phone } = userInfo;

  try {
    const res = await axiosAPI.post(`/apis/v1/users/auth/phone/send`, {
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
    const res = await axiosAPI.post(`/apis/v1/users/auth/phone/valid`, {
      username,
      phone,
      authCode,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 인증번호 확인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  //휴대폰 인증번호 전송
  const postPhoneAuthNumberMutate = useMutation({
    mutationFn: sendPhoneAuthNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SIGNUP_QUERY_KEYS.SINGUP],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  //인증번호 확인
  const checkPhoneAuthMutate = useMutation({
    mutationFn: checkPhoneAuth,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SIGNUP_QUERY_KEYS.SINGUP],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });
  return {
    postPhoneAuthNumberMutate,
    checkPhoneAuthMutate,
  };
};
