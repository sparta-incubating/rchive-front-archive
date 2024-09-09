import Image from 'next/image';
import { ComponentProps } from 'react';

const BookmarkIcon = ({ ...props }: ComponentProps<'button'>) => {
  return (
    <button className="flex h-10 w-10 items-center justify-center" {...props}>
      <div className="relative h-6 w-6">
        <Image
          src={'/assets/icons/uis_bookmark.svg'}
          alt={'북마크 아이콘'}
          fill
        />
      </div>
    </button>
  );
};
export default BookmarkIcon;
