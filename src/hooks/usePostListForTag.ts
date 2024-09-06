import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchTagParamsType } from '@/types/posts.types';

export const usePostListForTag = (initialSearchParams: SearchTagParamsType) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');

  const updateQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      const query = new URLSearchParams(window.location.search);

      if (key !== 'page') {
        setCurrentPage(1);
        query.set('page', '1');
      }

      router.push(
        `/tag?tagId=${initialSearchParams.tagId}&${query.toString()}`,
      );
    },
    [router],
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateQueryParams('postType', newTab);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  return {
    currentPage,
    activeTab,
    handleTabChange,
    handlePageChange,
    updateQueryParams,
  };
};
