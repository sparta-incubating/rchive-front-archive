'use client';

import { PostListResponse, SearchTagParamsType } from '@/types/posts.types';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';
import EmptyPage from '@/components/pages/emptyPage';
import HelperButton from '@/components/atoms/helperButton';
import { usePostListForTag } from '@/hooks/usePostListForTag';

interface PostListProps {
  searchParams: SearchTagParamsType;
  postListData: PostListResponse;
}

const PostList = ({ searchParams, postListData }: PostListProps) => {
  console.log({ postListData });
  const {
    currentPage,
    activeTab,
    handleTabChange,
    handlePageChange,
    updateQueryParams,
  } = usePostListForTag(searchParams);

  return (
    <div className="relative">
      <section className="flex flex-col gap-6">
        {/*<CategoryGroup
          keyword={searchParams?.title || ''}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />*/}
        {postListData.data.totalElements > 0 ? (
          <>
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
            {/*{searchParams?.title ||
              postTabArr.find((category) => category.id === activeTab)?.title}*/}
          </EmptyPage>
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default PostList;
