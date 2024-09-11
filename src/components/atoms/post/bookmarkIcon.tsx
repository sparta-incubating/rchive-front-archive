'use client';

import Image from 'next/image';
import { ComponentProps, useState } from 'react';

interface BookmarkIconProps extends ComponentProps<'button'> {
  isBookmarked: boolean;
  isHover: boolean;
  onClickBookmark: () => void;
}

const BookmarkIcon = ({
  isBookmarked,
  isHover,
  onClickBookmark,
  ...props
}: BookmarkIconProps) => {
  const [isInnerHovered, setIsInnerHovered] = useState<boolean>(false);
  return (
    <button
      className="flex h-10 w-10 items-center justify-center"
      {...props}
      onMouseEnter={() => setIsInnerHovered(true)}
      onMouseLeave={() => setIsInnerHovered(false)}
      onClick={onClickBookmark}
    >
      <div className="relative h-6 w-6">
        {isBookmarked ? (
          <Image
            src={'/assets/icons/select_bookmark.svg'}
            alt={'북마크 아이콘'}
            fill
          />
        ) : (
          isHover && (
            <Image
              // className={`transition-opacity duration-500 ${
              //   isInnerHovered ? 'opacity-100' : 'opacity-0'
              // }`}
              src={
                isInnerHovered
                  ? '/assets/icons/hover_bookmark.svg'
                  : '/assets/icons/un_bookmark.svg'
              }
              alt={'북마크 아이콘'}
              fill
            />
          )
        )}
      </div>
    </button>
  );
};
export default BookmarkIcon;
