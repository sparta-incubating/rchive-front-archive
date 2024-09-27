interface SearchResultTitleProps {
  keyword?: string;
  category?: string;
  tagName?: string;
}

const SearchResultTitle = ({
  keyword,
  category,
  tagName,
}: SearchResultTitleProps) => {
  return (
    <h1 className="pb-10 text-3xl font-semibold text-gray-900">
      {tagName && `#${tagName}`}
      {keyword ? `“${keyword}”에 대한 검색결과` : category}
    </h1>
  );
};

export default SearchResultTitle;
