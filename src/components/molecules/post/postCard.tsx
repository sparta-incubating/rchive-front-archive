import PostThumbnail from '@/components/atoms/post/postThumbnail';
import PostTitle from '@/components/atoms/post/postTitle';
import PostInfoTextGroup from '@/components/molecules/post/postInfoTextGroup';
import TagNameGroup from '@/components/molecules/post/tagNamegroup';
import { PostContentType } from '@/types/posts.types';
import { getNameCategory } from '@/utils/setAuthInfo/post.util';
import dayjs from 'dayjs';

interface PostCardProps {
  postData: PostContentType;
}

const PostCard = ({ postData }: PostCardProps) => {
  return (
    <article className="flex flex-col gap-3 pb-[22.5px] pt-2">
      <PostThumbnail thumbnail={postData.thumbnailUrl} />
      <PostTitle href={'#'} bookmark={postData.isBookmarked}>
        {postData.title}
      </PostTitle>
      <PostInfoTextGroup
        trackName={getNameCategory(postData.postType)}
        tutor={postData.tutor}
        updatedAt={dayjs(postData.uploadedAt).format('YYYY.MM.DD')}
      />
      {postData.tagList && (
        <TagNameGroup tags={postData.tagList.map((tag) => tag.tagName)} />
      )}
    </article>
  );
};

export default PostCard;
