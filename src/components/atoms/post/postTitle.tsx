import { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import BookmarkIcon from '@/components/atoms/post/bookmarkIcon';

interface PostTitleProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  bookmark: boolean;
}

const PostTitle = ({ children, bookmark, ...props }: PostTitleProps) => {
  return (
    <Link className="flex justify-between" {...props}>
      <div className="flex-1">
        <h2 className="font-pretendard line-clamp-2 text-lg font-bold text-gray-900">
          {children}
        </h2>
      </div>

      {bookmark && <BookmarkIcon />}
    </Link>
  );
};
export default PostTitle;
