'use client';

import React, { useRef, useState } from 'react';
import {
  useBookmarkQuery,
  useSearchBookmarkQuery,
} from '@/api/bookmark/useQuery';
import PostCard from '../molecules/post/postCard';
import { PostContentType } from '@/types/posts.types';
import HelperButton from '../atoms/helperButton';
import EmptyBookmark from './emptyBookmark';
import BookmarkInput from '../organisms/bookmarkInput';
import SearchResultTitle from '../atoms/searchResultTitle';
import { useBookmarkUpdate } from '@/api/bookmark/useMutation';

const BookMarkPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { bookmarkList, isPending, isError } = useBookmarkQuery();
  const { deleteBookMarkMutate } = useBookmarkUpdate();
  const [keyword, setKeyword] = useState<string>('');

  const List = bookmarkList?.data || [];
  const myBookmarkList = List.map((item: PostContentType) => ({
    ...item,
    isBookmarked: true,
  }));

  const handleSearchChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = inputRef.current?.value ?? '';
    setKeyword(value);
  };

  const { searchList } = useSearchBookmarkQuery(keyword);

  const handleAllItem = () => {
    try {
      myBookmarkList.forEach((item: PostContentType) => {
        deleteBookMarkMutate.mutateAsync(item.postId);
      });
    } catch (error) {
      console.error('북마크 삭제 실패');
    }
  };

  if (isPending) {
    return <div>대기중</div>;
  }

  if (isError) {
    return <div>오류발생</div>;
  }

  return (
    <div className="relative">
      <SearchResultTitle keyword={keyword} />

      <BookmarkInput ref={inputRef} onKeyDown={handleSearchChange} />
      <div className="mb-[40px] mt-[84px] flex h-[41px] w-[1152px] flex-row justify-between">
        <p className="text-3xl font-semibold">북마크 목록</p>
        <button onClick={handleAllItem}>
          <p className="text-[18px] font-bold">모두 지우기</p>
        </button>
      </div>

      <section className="flex flex-col gap-6">
        {myBookmarkList && myBookmarkList.length > 0 ? (
          <section className="mx-auto mb-14">
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {myBookmarkList.map((item: PostContentType) => (
                <PostCard postData={item} key={item.postId} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyBookmark />
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default BookMarkPage;
