import Image from 'next/image';

interface PostThumbnailProps {
  thumbnail?: string;
}

const PostThumbnail = ({ thumbnail = '' }: PostThumbnailProps) => {
  return (
    <article className="relative h-[156px] w-[270px] overflow-hidden rounded-[8px]">
      <Image
        src={thumbnail ? thumbnail : '/assets/icons/defaultThumbnail.png'}
        alt={'게시글 썸네일'}
        fill
      />
    </article>
  );
};

export default PostThumbnail;
