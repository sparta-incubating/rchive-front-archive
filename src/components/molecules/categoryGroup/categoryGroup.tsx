import SearchResultTitle from '@/components/atoms/searchResultTitle';

const CategoryGroup = () => {
  return (
    <section className="pt-10">
      {/*  title:
    1순위 search keyword
    2순위 category 출력
    */}
      <SearchResultTitle keyword="test" category="전체" />

      {/*  category tab */}
    </section>
  );
};

export default CategoryGroup;
