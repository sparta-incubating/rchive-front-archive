import {
  TOKEN_EXPIRATION_ERROR_CODE,
  TOKEN_EXPIRATION_ERROR_STATUS,
} from '@/constatns/auth.constant';

import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ErrorResponseType } from '@/components/pages/customError';

const useServerComponentErrorHandling = (errorData: ErrorResponseType) => {
  const { status, data } = errorData;
  const router = useRouter();

  useEffect(() => {
    if (status === 401) {
      if (typeof data === 'object') {
        if (
          data.errorCode === TOKEN_EXPIRATION_ERROR_CODE &&
          data.status === TOKEN_EXPIRATION_ERROR_STATUS
        ) {
          (async () => await signOut())();
        }
      } else {
        if (data === 'access token expired') {
          (async () => {
            try {
              axios.post('/api/auth/reissue').then(() => {
                router.refresh();
              });
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                  await signOut();
                }
              }
            }
          })();
        }
      }
    }
  }, [data, errorData, router, status]);
};

export default useServerComponentErrorHandling;
