import PostInfoText from '@/components/atoms/post/postInfoText';
import Rectangle from '@/components/atoms/post/rectangle';

interface PostInfoTextGroupProps {
  trackName: string;
  tutor: string;
  updatedAt: string;
}

const PostInfoTextGroup = ({
  trackName,
  tutor,
  updatedAt,
}: PostInfoTextGroupProps) => {
  return (
    <section className="flex items-center gap-2.5">
      <PostInfoText>{trackName}</PostInfoText>
      <Rectangle />
      <PostInfoText>{tutor}</PostInfoText>
      <Rectangle />
      <PostInfoText>{updatedAt}</PostInfoText>
    </section>
  );
};

export default PostInfoTextGroup;
