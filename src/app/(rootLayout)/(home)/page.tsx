'use client';

import React from 'react';
import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import CategoryGroup from '@/components/molecules/categoryGroup/categoryGroup';
import SubCategoryGroup from '@/components/molecules/subCategoryGroup/subCategoryGroup';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';

const page = () => {
  return (
    <div>
      <SearchInputContainer />
      <section className="flex flex-col gap-6">
        <CategoryGroup />
        <SubCategoryGroup />
        <PostListContainer />
        <PageNation
          currentPage={1}
          totalElements={60}
          size={10}
          onPageChange={() => {}}
        />
      </section>
    </div>
  );
};

export default page;
