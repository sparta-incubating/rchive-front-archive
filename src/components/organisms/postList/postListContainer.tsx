import PostCard from '@/components/molecules/post/postCard';
import React from 'react';
import { PostListResponse } from '@/types/posts.types';

interface PostListContainerProps {
  postListData: PostListResponse;
}

const PostListContainer = ({ postListData }: PostListContainerProps) => {
  const {
    data: { content },
  } = postListData;



  return (
    <section className="mx-auto mb-14">
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {content.map((item) => (
          <PostCard postData={item} key={item.postId} />
        ))}
      </div>
    </section>
  );
};

export default PostListContainer;
