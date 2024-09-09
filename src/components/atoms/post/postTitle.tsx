import { ComponentProps, ReactNode } from 'react';
import BookmarkIcon from '@/components/atoms/post/bookmarkIcon';

interface PostTitleProps extends ComponentProps<'div'> {
  children: ReactNode;
  bookmark: boolean;
}

const PostTitle = ({ children, bookmark, ...props }: PostTitleProps) => {
  return (
    <div className="flex cursor-pointer justify-between" {...props}>
      <div className="flex-1">
        <h2 className="font-pretendard line-clamp-2 text-lg font-bold text-gray-900">
          {children}
        </h2>
      </div>

      {bookmark && <BookmarkIcon />}
    </div>
  );
};
export default PostTitle;
