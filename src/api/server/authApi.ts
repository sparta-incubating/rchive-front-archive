import { RoleFormSchema } from '@/types/role.types';
<<<<<<< HEAD
import axiosInstance from '@/utils/axiosAPI';
import { client } from '@/utils/clientAPI';
=======
import axiosAPI from '../../utils/axios/axiosAPI';
import { client } from '../../utils/axios/clientAPI';
>>>>>>> dev

// 권한 신청 endpoint
export const postRoleApply = async (data: RoleFormSchema) => {
  try {
    const response = await client.post('/apis/v1/role', data);
    return response.data;
  } catch (error) {
    throw new Error('권한 신청에 실패했습니다.');
  }
};

// 마지막 접속 정보 endpoint
export const getLastConnectRole = async (accessToken: string) => {
<<<<<<< HEAD
  return await axiosInstance.get('/apis/v1/role/select/last', {
=======
  return await axiosAPI.get('/apis/v1/role/select/last', {
>>>>>>> dev
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 권한 신청 여부 조회 endpoint
export const getRoleApplyStatus = async (accessToken: string) => {
<<<<<<< HEAD
  return await axiosInstance.get('/apis/v1/role/request', {
=======
  return await axiosAPI.get('/apis/v1/role/request', {
>>>>>>> dev
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const login = async (
  username: string | undefined,
  password: string | undefined,
) => {
<<<<<<< HEAD
  return await axiosInstance.post('/apis/v1/users/login', {
=======
  return await axiosAPI.post('/apis/v1/users/login', {
>>>>>>> dev
    username,
    password,
  });
};

export const logout = async (accessToken: string) => {
<<<<<<< HEAD
  await axiosInstance.delete('/apis/v1/users/logout', {
=======
  await axiosAPI.delete('/apis/v1/users/logout', {
>>>>>>> dev
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const refreshToken = async (refreshToken: string) => {
<<<<<<< HEAD
  return await axiosInstance.post(
=======
  return await axiosAPI.post(
>>>>>>> dev
    '/apis/v1/users/reissue',
    {},
    {
      headers: {
        Cookie: `Refresh=${refreshToken}`,
      },
    },
  );
};
