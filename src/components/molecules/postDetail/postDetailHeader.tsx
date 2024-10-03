'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import PostDetailHeaderText from '@/components/atoms/postDetail/postDetailHeaderText';
import BookmarkIcon from '@/components/atoms/post/bookmarkIcon';
import { useState } from 'react';
import { useBookmarkUpdate } from '@/api/bookmark/useBookmarkMutation';

interface PostDetailHeaderProps {
  title: string;
  tutor: string;
  uploadedAt: string;
  bookmark: boolean;
  postId: string;
}

const PostDetailHeader = ({
  title,
  tutor,
  bookmark,
  uploadedAt,
  postId,
}: PostDetailHeaderProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState(bookmark);
  const router = useRouter();

  const { postBookmarkMutate, deleteBookMarkMutate } = useBookmarkUpdate();

  const handleToggleBookmark = async (postId: number) => {
    if (isBookmarked) {
      await deleteBookMarkMutate.mutateAsync(postId);
    } else {
      await postBookmarkMutate.mutateAsync(postId);
    }
    setIsBookmarked(!isBookmarked);
    router.refresh();
  };

  return (
    <section className="mx-auto flex h-16 w-[1152px] items-center justify-between py-2">
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-3"
      >
        <div className="relative h-6 w-6">
          <Image src="/assets/icons/prevPageBlack.svg" alt="이전페이지" fill />
        </div>
        <span className="text-center text-lg font-semibold">{title}</span>
      </button>

      <div className="flex items-center gap-4">
        <PostDetailHeaderText>{tutor}</PostDetailHeaderText>
        <div className="h-4 w-[1px] bg-gray-400"></div>
        <PostDetailHeaderText>
          {dayjs(uploadedAt).format('YYYY.MM.DD')}
        </PostDetailHeaderText>
        <BookmarkIcon
          isBookmarked={bookmark}
          isHover={true}
          onClickBookmark={() => handleToggleBookmark(parseInt(postId))}
        />
      </div>
    </section>
  );
};

export default PostDetailHeader;
