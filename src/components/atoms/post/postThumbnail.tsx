import Image from 'next/image';
import { ComponentProps } from 'react';

interface PostThumbnailProps extends ComponentProps<'div'> {
  thumbnail?: string;
  isHover: boolean;
}

const PostThumbnail = ({
  thumbnail = '',
  isHover,
  ...props
}: PostThumbnailProps) => {
  return (
    <article
      {...props}
      className={`relative h-[156px] w-[270px] cursor-pointer overflow-hidden rounded-[8px] transition-transform duration-300 ease-in-out ${isHover && '-translate-y-2 shadow-hoverPostCard'}`}
    >
      <Image
        src={thumbnail ? thumbnail : '/assets/icons/defaultThumbnail.png'}
        alt={'게시글 썸네일'}
        fill
      />
    </article>
  );
};

export default PostThumbnail;
