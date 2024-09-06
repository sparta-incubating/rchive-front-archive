import { useState } from 'react';
import { useAppSelector } from '@/redux/storeConfig';
import useSearchTutor from '@/hooks/useSearchTutor';
import { SearchParamsType } from '@/types/posts.types';
import useRecentSearchHistory from '@/hooks/useRecentSearchHistory';
import { useQueryClient } from '@tanstack/react-query';
import { RECENT_SEARCH_KEY } from '@/api/signup/keys.constant';
import useQueryParams from '@/hooks/useQueryParams';

export const usePostList = (initialSearchParams: SearchParamsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tutor, setTutor] = useState<string>('0');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>(
    initialSearchParams?.title || '',
  );
  const updateQueryParams = useQueryParams();

  const { recentSearchMutation } = useRecentSearchHistory();
  const queryClient = useQueryClient();

  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );

  const getFetchTutors = useSearchTutor(trackName, loginPeriod, loginPeriod);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateQueryParams('postType', newTab, setCurrentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page, setCurrentPage);
  };

  const handleSearchClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    keyword: string,
  ) => {
    e.stopPropagation();
    setKeyword(keyword);
    updateQueryParams('title', keyword, setCurrentPage);
  };

  const handleKeywordSearch = async () => {
    if (keyword) {
      recentSearchMutation.mutate(
        {
          trackName,
          period: Number(loginPeriod),
          keyword,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: [RECENT_SEARCH_KEY],
            });
            updateQueryParams('title', keyword, setCurrentPage);
          },
        },
      );
    } else {
      updateQueryParams('title', keyword, setCurrentPage);
    }
  };

  return {
    currentPage,
    tutor,
    setTutor,
    activeTab,
    keyword,
    setKeyword,
    getFetchTutors,
    handleTabChange,
    handlePageChange,
    handleKeywordSearch,
    updateQueryParams,
    handleSearchClick,
    setCurrentPage,
  };
};
