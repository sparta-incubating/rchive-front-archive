'use client';

import SearchResultTitle from '@/components/atoms/searchResultTitle';
import CategoryTapMenu from '@/components/atoms/category/categoryTabMenu';
import { postTabArr } from '@/constatns/post.constant';

type CategoryGroupProps = {
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const CategoryGroup = ({ activeTab, setActiveTab }: CategoryGroupProps) => {
  const activeCategory = postTabArr.find(
    (category) => category.id === activeTab,
  );

  return (
    <section className="pt-10">
      <SearchResultTitle keyword="" category={activeCategory!.title} />

      {/*  category tab */}
      <CategoryTapMenu
        data={postTabArr}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

export default CategoryGroup;
