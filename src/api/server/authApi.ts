import { RoleFormSchema } from '@/types/role.types';
import { client } from '@/utils/axios/clientAPI';
import axiosAPI from '@/utils/axios/axiosAPI';
import axios from 'axios';
import { MyRoleResponse } from '@/types/auth.types';

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
  return await axiosAPI.get('/apis/v1/role/select/last', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 권한 신청 여부 조회 endpoint
export const getRoleApplyStatus = async (accessToken: string) => {
  return await axiosAPI.get('/apis/v1/role/request', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const login = async (
  username: string | undefined,
  password: string | undefined,
) => {
  return await axiosAPI.post('/apis/v1/users/login', {
    username,
    password,
  });
};

export const logout = async (accessToken: string) => {
  await axiosAPI.delete('/apis/v1/users/logout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const refreshToken = async (refreshToken: string) => {
  return await axiosAPI.post(
    '/apis/v1/users/reissue',
    {},
    {
      headers: {
        Cookie: `Refresh=${refreshToken}`,
      },
    },
  );
};

// 로그인 정보의 모든 role 가져오기
export const getAllMyRoles = async (accessToken: string) => {
  try {
    return await axiosAPI.get<MyRoleResponse>('/apis/v1/role', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.log({ error });
      }
    }
  }
};

// 로그인 프로필 정보
export const getMyProfile = async (
  trackName: string,
  period: number,
  accessToken: string,
) => {
  try {
    return await axiosAPI.get(
      `/apis/v1/profile?trackName=${trackName}&period=${period}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({ error });
    }
  }
};
