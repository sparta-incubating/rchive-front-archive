'use client';

import SearchResultTitle from '@/components/atoms/searchResultTitle';
import CategoryTapMenu from '@/components/atoms/category/categoryTabMenu';
import usePostTypeNames from '@/hooks/usePostTypeNames';

type CategoryGroupProps = {
  keyword: string;
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const CategoryGroup = ({
  keyword,
  activeTab,
  setActiveTab,
}: CategoryGroupProps) => {
  const { categoryData } = usePostTypeNames();

  console.log({ categoryData });
  const activeCategory = categoryData.find(
    (category) => category.id === activeTab,
  );

  return (
    <section className="pt-10">
      <SearchResultTitle keyword={keyword} category={activeCategory?.title} />

      {/*  category tab */}
      <CategoryTapMenu
        data={categoryData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

export default CategoryGroup;
