import { Admin, User } from '@/class/signup';
import {
  emailUniqueResponseType,
  nicknameUniqueResponseType,
} from '@/types/signup.types';
import axiosAPI from '../../utils/axios/axiosAPI';
import axios from 'axios';
import { client } from '@/utils/axios/clientAPI';

export const postSignup = async (userData: User | Admin) => {
  try {
    const response = await axiosAPI.post('/apis/v1/users/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

export const getMailCheck = async (email: string) => {
  try {
    const response = await axiosAPI.get<emailUniqueResponseType>(
      `/apis/v1/users/overlap/email?email=${email}`,
    );

    return response.data;
  } catch (error) {
    throw new Error('이메일 중복 확인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const getNicknameCheck = async (nickname: string) => {
  try {
    const response = await axiosAPI.get<nicknameUniqueResponseType>(
      `/apis/v1/users/overlap/nickname?nickname=${nickname}`,
    );

    return response.data;
  } catch (error) {
    throw new Error('닉네임 중복 확인에 실패했습니다. 다시 시도해주세요.');
  }
};

// 마지막 접속 권한 조회 endpoint
export const getLastConnectRole = async () => {
  try {
    await axios.get('/api/auth/lastConnectRole');
  } catch (error) {
    throw new Error('마지막 권한 조회에 실패했습니다.');
  }
};

// 마지막 접속 권한 등록 endpoint
export const patchLastConnectRole = async (
  trackName: string,
  period: number,
) => {
  try {
    await client.patch('/apis/v1/role/select', { trackName, period });
  } catch (error) {
    throw new Error('마지막 권한 등록에 실패했습니다.');
  }
};
