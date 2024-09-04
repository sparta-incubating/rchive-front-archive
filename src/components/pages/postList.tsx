'use client';

import { PostListResponse, SearchParamsType } from '@/types/posts.types';
import { usePostList } from '@/hooks/usePostList';
import SearchInput from '@/components/organisms/searchInput';
import CategoryGroup from '@/components/molecules/categoryGroup/categoryGroup';
import SubCategoryGroup from '@/components/molecules/subCategoryGroup/subCategoryGroup';
import CategoryCategory from '@/components/molecules/categorySelector';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';
import EmptyPage from '@/components/pages/emptyPage';
import { postTabArr } from '@/constatns/post.constant';
import HelperButton from '@/components/atoms/helperButton';

interface PostListProps {
  searchParams: SearchParamsType;
  postListData: PostListResponse;
}

const PostList = ({ searchParams, postListData }: PostListProps) => {
  const {
    currentPage,
    tutor,
    setTutor,
    activeTab,
    keyword,
    setKeyword,
    getFetchTutors,
    handleTabChange,
    handlePageChange,
    handleKeywordSearch,
    updateQueryParams,
  } = usePostList(searchParams);

  return (
    <div className="relative">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleKeywordSearch}
      />
      <section className="flex flex-col gap-6">
        <CategoryGroup
          keyword={searchParams?.title || ''}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
        {postListData.data.totalElements > 0 ? (
          <>
            <SubCategoryGroup>
              <CategoryCategory
                label="튜터"
                filterData={getFetchTutors || []}
                defaultValue={tutor}
                setValue={(value) => {
                  setTutor(value);
                  updateQueryParams('tutorId', value);
                }}
              />
            </SubCategoryGroup>
            <PostListContainer postListData={postListData} />
            <PageNation
              currentPage={currentPage}
              totalElements={postListData.data.totalElements}
              size={postListData.data.size}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyPage>
            {searchParams?.title ||
              postTabArr.find((category) => category.id === activeTab)?.title}
          </EmptyPage>
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default PostList;
