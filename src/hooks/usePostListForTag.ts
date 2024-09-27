'use client';

import { useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';

export const usePostListForTag = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');
  const updateQueryParams = useQueryParams('/tag');

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
