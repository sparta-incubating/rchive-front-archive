'use client';

import React from 'react';
import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import CategoryGroup from '@/components/molecules/categoryGroup/categoryGroup';
import SubCategoryGroup from '@/components/molecules/subCategoryGroup/subCategoryGroup';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';
import HelperButton from '@/components/atoms/helperButton';

const page = () => {
  return (
    <div className="relative">
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
      <HelperButton />
    </div>
  );
};

export default page;
