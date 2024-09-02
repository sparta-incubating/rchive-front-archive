import PostThumbnail from '@/components/atoms/post/postThumbnail';
import PostTitle from '@/components/atoms/post/postTitle';
import PostInfoTextGroup from '@/components/molecules/post/postInfoTextGroup';
import TagNameGroup from '@/components/molecules/post/tagNamegroup';

interface PostCardProps {
  bookmark: boolean;
  tags: string[];
}

const PostCard = ({ bookmark, tags }: PostCardProps) => {
  return (
    <article className="flex flex-col gap-3 pb-[22.5px] pt-2">
      <PostThumbnail />
      <PostTitle href={'#'} bookmark={bookmark}>
        피그마 활용법(1) - 2주차피그마 활용법(1) - 2주차피그마 활용법(1) -
        2주차피그마 활용법(1) - 2주차피그마 활용법(1) - 2주차피그마 활용법(1) -
        2주차피그마 활용법(1) - 2주차피그마 활용법(1) - 2주차피그마 활용법(1) -
        2주차피그마 활용법(1) - 2주차피그마 활용법(1) - 2주차피그마 활용법(1) -
        2주차피그마 활용법(1) - 2주차피그마 활용법(1) - 2주차
      </PostTitle>
      <PostInfoTextGroup
        trackName="특강/실시간 세션"
        tutor="김태길"
        updatedAt="2024.08.29"
      />
      <TagNameGroup tags={tags} />
    </article>
  );
};

export default PostCard;
