'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteRecentSearch,
  getRecentSearch,
  postRecentSearch,
} from '@/api/client/postApi';
import { useAppSelector } from '@/redux/storeConfig';

interface RecentSearchParams {
  trackName: string;
  period: number;
  keyword: string;
}

interface RecentSearchItem {
  keyword: string;
}

interface RecentSearchResponse {
  data: RecentSearchItem[];
  message: string;
  status: number;
}

const useRecentSearchHistory = () => {
  const { trackName, period } = useAppSelector((state) => state.authSlice);

  const recentSearchMutation = useMutation({
    mutationFn: async ({ trackName, period, keyword }: RecentSearchParams) => {
      return postRecentSearch(trackName, period, keyword);
    },
  });

  const { data: recentSearchData } = useQuery<RecentSearchResponse>({
    queryKey: ['recentSearch'],
    queryFn: () => getRecentSearch(trackName, Number(period)),
    staleTime: Infinity,
    enabled: !!trackName || !!period,
  });

  const deleteRecentMutation = useMutation({
    mutationFn: async ({ trackName, period, keyword }: RecentSearchParams) => {
      return deleteRecentSearch(trackName, period, keyword);
    },
  });

  return { recentSearchMutation, recentSearchData, deleteRecentMutation };
};

export default useRecentSearchHistory;
