'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import PostDetailHeaderText from '@/components/atoms/postDetail/postDetailHeaderText';

interface PostDetailHeaderProps {
  title: string;
  tutor: string;
  uploadedAt: string;
}

const PostDetailHeader = ({
  title,
  tutor,
  uploadedAt,
}: PostDetailHeaderProps) => {
  const router = useRouter();

  return (
    <section className="mx-auto flex h-16 w-[1152px] items-center justify-between py-2">
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer gap-3"
      >
        <div className="relative h-6 w-6" onClick={() => router.back()}>
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
      </div>
    </section>
  );
};

export default PostDetailHeader;
