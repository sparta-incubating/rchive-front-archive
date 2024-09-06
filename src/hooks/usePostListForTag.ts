import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchTagParamsType } from '@/types/posts.types';
import useQueryParams from '@/hooks/useQueryParams';

export const usePostListForTag = (initialSearchParams: SearchTagParamsType) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');
  const updateQueryParams = useQueryParams();

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateQueryParams('postType', newTab, setCurrentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page, setCurrentPage);
  };

  return {
    currentPage,
    activeTab,
    handleTabChange,
    handlePageChange,
  };
};
