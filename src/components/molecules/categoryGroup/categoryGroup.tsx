'use client';

import SearchResultTitle from '@/components/atoms/searchResultTitle';
import { useState } from 'react';
import CategoryTapMenu from '@/components/atoms/category/categoryTabMenu';
import { postTabArr } from '@/constatns/post.constant';

const CategoryGroup = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // updateQueryParams('postType', newTab);
  };
  return (
    <section className="pt-10">
      {/*  title:
    1순위 search keyword
    2순위 category 출력
    */}
      <SearchResultTitle keyword="" category="전체" />

      {/*  category tab */}
      <CategoryTapMenu
        data={postTabArr}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
    </section>
  );
};

export default CategoryGroup;
