import Image from 'next/image';

interface PostThumbnailProps {
  image?: string;
}

const PostThumbnail = ({ image = '' }: PostThumbnailProps) => {
  return (
    <article className="relative h-[156px] w-[270px] overflow-hidden rounded-[8px]">
      <Image
        src={image ? image : '/assets/icons/defaultThumbnail.png'}
        alt={'게시글 썸네일'}
        fill
      />
    </article>
  );
};

export default PostThumbnail;
