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
import { useEffect, useState } from 'react';

interface PostListProps {
  searchParams: SearchParamsType;
  postListDataResponse: PostListResponse;
}

const PostList = ({ searchParams, postListDataResponse }: PostListProps) => {
  const [postListData, setPostListData] = useState<PostListResponse>();

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
    handleSearchClick,
    setCurrentPage,
  } = usePostList(searchParams);

  useEffect(() => {
    setPostListData(postListDataResponse);
  }, [postListDataResponse]);

  return (
    <div className="relative">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleKeywordSearch}
        handleSearchClick={handleSearchClick}
      />
      <section className="flex flex-col gap-6">
        <CategoryGroup
          keyword={searchParams?.title || ''}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
        {!!postListData &&
          (postListData.data.totalElements > 0 ? (
            <>
              <SubCategoryGroup>
                <CategoryCategory
                  label="튜터"
                  filterData={getFetchTutors || []}
                  defaultValue={tutor}
                  setValue={(value) => {
                    setTutor(value);
                    updateQueryParams('tutorId', value, setCurrentPage);
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
          ))}
      </section>
      <HelperButton />
    </div>
  );
};

export default PostList;
