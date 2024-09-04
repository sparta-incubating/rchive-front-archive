import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/storeConfig';
import useSearchTutor from '@/hooks/useSearchTutor';
import { SearchParamsType } from '@/types/posts.types';

export const usePostList = (initialSearchParams: SearchParamsType) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tutor, setTutor] = useState<string>('0');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>(
    initialSearchParams?.title || '',
  );

  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );

  const updateQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      const query = new URLSearchParams(window.location.search);
      if (value && !(key === 'tutorId' && value === 'all')) {
        query.set(key, String(value));
      } else {
        query.delete(key);
      }

      if (key !== 'page') {
        setCurrentPage(1);
        query.set('page', '1');
      }

      router.push(`/?${query.toString()}`);
    },
    [router],
  );

  const getFetchTutors = useSearchTutor(trackName, loginPeriod, loginPeriod);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateQueryParams('postType', newTab);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  const handleKeywordSearch = () => {
    updateQueryParams('title', keyword);
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
  };
};
