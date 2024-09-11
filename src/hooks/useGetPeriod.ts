'use client';

import { getPeriod } from '@/api/client/postApi';
import { SelectOptionType } from '@/types/signup.types';

import { useQuery } from '@tanstack/react-query';

const useGetPeriod = (track: string, role: string = 'STUDENT') => {
  const { data } = useQuery({
    queryKey: ['period', track],
    // track은 login 정보에서 가져와야함
    queryFn: () => getPeriod<SelectOptionType[]>(track),
    enabled: role === 'STUDENT' && !!track,
    retry: 3,
    staleTime: 60 * 1000,
  });
  return data;
};

export default useGetPeriod;
