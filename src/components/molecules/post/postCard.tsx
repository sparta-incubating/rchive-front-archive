'use client';

import PostThumbnail from '@/components/atoms/post/postThumbnail';
import PostTitle from '@/components/atoms/post/postTitle';
import PostInfoTextGroup from '@/components/molecules/post/postInfoTextGroup';
import TagNameGroup from '@/components/molecules/post/tagNamegroup';
import { PostContentType } from '@/types/posts.types';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookmarkUpdate } from '@/api/bookmark/useMutation';

interface PostCardProps {
  postData: PostContentType;
}

const PostCard = ({ postData }: PostCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState(postData.isBookmarked);
  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const { postBookmarkMutate, deleteBookMarkMutate } = useBookmarkUpdate();
  const handleToggleBookmark = async (postId: number) => {
    if (isBookmarked) {
      await deleteBookMarkMutate.mutateAsync(postId);
    } else {
      await postBookmarkMutate.mutateAsync(postId);
    }
    setIsBookmarked(!isBookmarked);
    router.refresh();
  };

  return (
    <article
      className="group flex flex-col gap-3 pb-[22.5px] pt-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <PostThumbnail
        thumbnail={postData.thumbnailUrl}
        isHover={isHover}
        onClick={() => handleClickPost(postData.postId)}
      />
      <PostTitle
        onClickPost={() => handleClickPost(postData.postId)}
        bookmark={isBookmarked}
        isHover={isHover}
        onClickBookmark={() => handleToggleBookmark(postData.postId)}
      >
        {postData.title}
      </PostTitle>
      <PostInfoTextGroup
        trackName={postData.postType.value}
        tutor={postData.tutor}
        updatedAt={dayjs(postData.uploadedAt).format('YYYY.MM.DD')}
      />
      {postData.tagList && <TagNameGroup tagList={postData.tagList} />}{' '}
    </article>
  );
};

export default PostCard;
