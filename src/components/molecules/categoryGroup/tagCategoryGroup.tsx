'use client';

import SearchResultTitle from '@/components/atoms/searchResultTitle';
import { postTabArr } from '@/constatns/post.constant';
import TagCategoryTapMenu from '@/components/atoms/category/tagCategoryTabMenu';

type CategoryGroupProps = {
  tagName: string;
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const TagCategoryGroup = ({
  tagName,
  activeTab,
  setActiveTab,
}: CategoryGroupProps) => {
  return (
    <section className="pt-10">
      <SearchResultTitle tagName={tagName} />

      {/*  category tab */}
      <TagCategoryTapMenu
        data={postTabArr}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    </section>
  );
};

export default TagCategoryGroup;
