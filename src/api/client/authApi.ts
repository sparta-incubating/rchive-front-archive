import { Admin, User } from '@/class/signup';
import { emailUniqueResponseType } from '@/types/signup.types';
<<<<<<< HEAD
import axiosAPI from '@/utils/axiosAPI';
import axios from 'axios';

export const postSignup = async (userData: User | Admin) => {
  try {
    const response = await axiosAPI.post('/apis/v1/users/signup', userData);
=======
import axiosAPI from '../../utils/axios/axiosAPI';
import axios from 'axios';

export const postSignup = async (userData: User | Admin) => {
  const singupData = {
    ...userData,
    nickname: '',
    profileImg: 'default',
  };

  try {
    const response = await axiosAPI.post('/apis/v1/users/signup', singupData);
>>>>>>> dev
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

// 마지막 접속 권한 endpoint
export const getLastConnectRole = async () => {
  try {
    await axios.get('/api/auth/lastConnectRole');
  } catch (error) {
<<<<<<< HEAD
    throw new Error('마지막 권환 조회에 실패했습니다.');
=======
    throw new Error('마지막 권한 조회에 실패했습니다.');
>>>>>>> dev
  }
};
