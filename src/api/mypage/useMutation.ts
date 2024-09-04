import { queryClient } from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from './keys.constant';
import {
  checkPhoneAuth,
  deleteUser,
  sendPhoneAuthNumber,
  updateNickname,
  updatePassword,
  updatePhoneNumber,
  updateProfileInfo,
  updateRole,
} from './profileApi';

export const useMyPageUpdate = () => {
  //휴대폰 인증번호 전송
  const postPhoneAuthNumberMutate = useMutation({
    mutationFn: sendPhoneAuthNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
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
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  //휴대폰 변경
  const updatePhoneNumberMutate = useMutation({
    mutationFn: updatePhoneNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updatePasswordMutate = useMutation({
    mutationFn: updatePassword,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updateRoleMutate = useMutation({
    mutationFn: updateRole,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updateProfileInfoMutate = useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });
  const deleteUserMutate = useMutation({
    mutationFn: deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updateNicknameMutate = useMutation({
    mutationFn: updateNickname,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  return {
    updatePhoneNumberMutate,
    updatePasswordMutate,
    updateRoleMutate,
    updateProfileInfoMutate,
    postPhoneAuthNumberMutate,
    checkPhoneAuthMutate,
    deleteUserMutate,
    updateNicknameMutate,
  };
};
