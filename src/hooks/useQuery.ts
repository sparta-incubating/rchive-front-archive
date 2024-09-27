'use client';

import { useQuery } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from '@/api/mypage/keys.constant';
import {
  getMyRole,
  getTrackPeriodList,
  getUserInfo,
} from '@/api/mypage/profileApi';

export function useUserInfoDataQuery() {
  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: getUserInfo,
  });

  return { userData, isPending, isError };
}

export function usePeriodListQuery(trackName: string) {
  const { data } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PERIODLIST, trackName],
    queryFn: () => getTrackPeriodList(trackName),
    enabled: !!trackName,
  });

  return data?.data?.trackPeriodList;
}

export function useGetRoleQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.ROLE],
    queryFn: getMyRole,
  });

  return { data, isPending, isError };
}
