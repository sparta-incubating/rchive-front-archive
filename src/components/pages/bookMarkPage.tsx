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
import PageNation from '../atoms/pageNation';
import {
  BOOKMARK_DEFAULT_PAGE,
  BOOKMARK_DEFAULT_PAGE_SIZE,
} from '@/constatns/bookmark.constant';
import { useRouter } from 'next/navigation';

const BookMarkPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(
    Number(BOOKMARK_DEFAULT_PAGE),
  );

  const { bookmarkList, isPending, isError } = useBookmarkQuery();
  const { deleteBookMarkMutate } = useBookmarkUpdate();
  const { searchList } = useSearchBookmarkQuery(keyword);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const myBookmarkList = bookmarkList?.data || [];
  // const myBookmarkList = List.map((item: PostContentType) => ({
  //   ...item,
  //   isBookmarked: true,
  // }));

  const totalElements = myBookmarkList.length;

  const handleSearchChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = inputRef.current?.value ?? '';
    if (event.key === 'Enter') {
      setCurrentPage(1);
      setKeyword(value);
    }

    if (value === '') {
      setCurrentPage(1);
      setKeyword('');
    }
  };

  const searchBookmarkList = searchList?.data;

  const handleAllItem = () => {
    try {
      myBookmarkList.forEach((item: PostContentType) => {
        deleteBookMarkMutate.mutateAsync(item.postId);
      });
      router.refresh();
    } catch (error) {
      console.error('북마크 삭제 실패');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return <div>대기중</div>;
  }

  if (isError) {
    return <div>오류발생</div>;
  }

  const displayList = keyword ? searchBookmarkList : myBookmarkList;

  return (
    <div className="relative">
      {/* 북마크 검색 */}
      <BookmarkInput ref={inputRef} onKeyDown={handleSearchChange} />

      {/* 북마크 헤더 */}
      <div className="mb-[40px] mt-[84px] flex h-[41px] w-[1152px] flex-row justify-between">
        <SearchResultTitle keyword={keyword} category={'북마크 목록'} />
        <button onClick={handleAllItem}>
          <p className="text-[18px] font-bold">모두 지우기</p>
        </button>
      </div>

      {/* 북마크 리스트 */}
      <section className="flex flex-col gap-6">
        {displayList && displayList.length > 0 ? (
          <section className="mx-auto mb-14">
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayList.map((item: PostContentType) => (
                <PostCard postData={item} key={item.postId} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyBookmark />
        )}

        {!keyword && myBookmarkList.length > 0 && (
          <PageNation
            currentPage={currentPage}
            totalElements={totalElements}
            size={Number(BOOKMARK_DEFAULT_PAGE_SIZE)}
            onPageChange={handlePageChange}
          />
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default BookMarkPage;
