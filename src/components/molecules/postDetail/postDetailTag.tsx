import TagCard from '@/components/molecules/tagCard';
import { TagType } from '@/types/tag.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constatns/posts.constant';
import TagName from '@/components/atoms/post/tagNameProps';

const PostDetailTag = ({ tags }: { tags: TagType[] }) => {
  return (
    <div className="flex flex-wrap gap-[7.73px]">
      {tags.map((tag, index) => (
        <TagName
          href={`/?title=%23${tag.tagName}&page=${DEFAULT_PAGE}&size=${DEFAULT_PAGE_SIZE}`}
          key={tag.tagId}
        >
          <TagCard key={index} className="pr-3">
            #{tag.tagName}
          </TagCard>
        </TagName>
      ))}
    </div>
  );
};

export default PostDetailTag;
