import TagCard from '@/components/molecules/tagCard';
import { TagType } from '@/types/tag.types';

const PostDetailTag = ({ tags }: { tags: TagType[] }) => {
  return (
    <div className="flex flex-wrap gap-[7.73px]">
      {tags.map((tag, index) => (
        <TagCard key={index} className="pr-3">
          {tag.tagName}
        </TagCard>
      ))}
    </div>
  );
};

export default PostDetailTag;
