'use client';

import { PostListResponse, SearchTagParamsType } from '@/types/posts.types';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';
import EmptyPage from '@/components/pages/emptyPage';
import HelperButton from '@/components/atoms/helperButton';
import { usePostListForTag } from '@/hooks/usePostListForTag';
import TagCategoryGroup from '@/components/molecules/categoryGroup/tagCategoryGroup';

interface PostListProps {
  searchParams: SearchTagParamsType;
  postListData: PostListResponse;
}

const PostList = ({ searchParams, postListData }: PostListProps) => {
  const { currentPage, activeTab, handleTabChange, handlePageChange } =
    usePostListForTag();

  const tagName = searchParams.tagName;

  return (
    <div className="relative">
      <section className="flex flex-col gap-6">
        <TagCategoryGroup
          tagName={tagName}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
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
          <EmptyPage>태그</EmptyPage>
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default PostList;
