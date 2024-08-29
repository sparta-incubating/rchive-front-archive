import React from 'react';
import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import CategoryGroup from '@/components/molecules/categoryGroup/categoryGroup';
import SubCategoryGroup from '@/components/molecules/subCategoryGroup/subCategoryGroup';

const page = () => {
  return (
    <div>
      <SearchInputContainer />
      <section className="flex flex-col gap-6">
        <CategoryGroup />
        <SubCategoryGroup />
      </section>
    </div>
  );
};

export default page;
