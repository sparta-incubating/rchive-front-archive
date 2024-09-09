import PostThumbnail from '@/components/atoms/post/postThumbnail';
import PostTitle from '@/components/atoms/post/postTitle';
import PostInfoTextGroup from '@/components/molecules/post/postInfoTextGroup';
import TagNameGroup from '@/components/molecules/post/tagNamegroup';
import { PostContentType } from '@/types/posts.types';
import { getNameCategory } from '@/utils/setAuthInfo/post.util';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  postData: PostContentType;
}

const PostCard = ({ postData }: PostCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`/post/${postId}`);
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
        onClick={() => handleClickPost(postData.postId)}
        bookmark={postData.isBookmarked}
      >
        {postData.title}
      </PostTitle>
      <PostInfoTextGroup
        trackName={getNameCategory(postData.postType)}
        tutor={postData.tutor}
        updatedAt={dayjs(postData.uploadedAt).format('YYYY.MM.DD')}
      />
      {postData.tagList && <TagNameGroup tagList={postData.tagList} />}
    </article>
  );
};

export default PostCard;
