import { ComponentProps, ReactNode } from 'react';
import BookmarkIcon from '@/components/atoms/post/bookmarkIcon';

interface PostTitleProps extends ComponentProps<'div'> {
  children: ReactNode;
  bookmark: boolean;
  isHover: boolean;
  onClickBookmark: () => void;
  onClickPost: () => void;
}

const PostTitle = ({
  children,
  bookmark,
  isHover,
  onClickBookmark,
  onClickPost,
  ...props
}: PostTitleProps) => {
  return (
    <div className="flex cursor-pointer justify-between" {...props}>
      <div className="flex-1">
        <h2 className="font-pretendard line-clamp-2 text-lg font-bold text-gray-900">
          <button
            onClick={onClickPost}
            className="line-clamp-1 overflow-hidden overflow-ellipsis"
          >
            {children}
          </button>
        </h2>
      </div>

      <BookmarkIcon
        isBookmarked={bookmark}
        isHover={isHover}
        onClickBookmark={onClickBookmark}
      />
    </div>
  );
};
export default PostTitle;
