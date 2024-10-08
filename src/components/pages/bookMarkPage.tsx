'use client';

import React, { useRef, useState } from 'react';
import {
  useBookmarkQuery,
  useSearchBookmarkQuery,
} from '@/api/bookmark/useBookmarkQuery';
import PostCard from '../molecules/post/postCard';
import { PostContentType } from '@/types/posts.types';
import HelperButton from '../atoms/helperButton';
import EmptyBookmark from './emptyBookmark';
import BookmarkInput from '../organisms/bookmarkInput';
import SearchResultTitle from '../atoms/searchResultTitle';
import { useBookmarkUpdate } from '@/api/bookmark/useBookmarkMutation';
import PageNation from '../atoms/pageNation';
import {
  BOOKMARK_DEFAULT_PAGE,
  BOOKMARK_DEFAULT_PAGE_SIZE,
} from '@/constatns/bookmark.constant';
import { useConfirmContext } from '@/context/useConfirmContext';
import Confirm from '../atoms/confirm';
import { useRouter } from 'next/navigation';
import ProgressModal from '@/components/pages/progressModal';

const BookMarkPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(
    Number(BOOKMARK_DEFAULT_PAGE),
  );

  const { bookmarkList, isPending, isError } = useBookmarkQuery();
  const { deleteAllBookMarkMutate } = useBookmarkUpdate();
  const { searchList } = useSearchBookmarkQuery(titleKeyword);
  const inputRef = useRef<HTMLInputElement>(null);

  const myBookmarkList = bookmarkList?.data || [];

  const confirm = useConfirmContext();
  const router = useRouter();

  const totalElements = myBookmarkList.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^.{0,255}$/.test(inputValue)) {
      setKeyword(inputValue);
    }
  };

  const handleOnKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (/^.{0,255}$/.test(keyword)) {
        setCurrentPage(1);
        setTitleKeyword(keyword);
      }
    }
  };

  const searchBookmarkList = searchList?.data;

  const handleAllItem = async () => {
    try {
      const result = await confirm.handleConfirm(
        <Confirm text="삭제">
          <div className="flex flex-col gap-2.5">
            <span className="text-center text-xl font-bold">
              모두 삭제하시겠어요?
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-center text-base font-medium text-gray-600">
                삭제할 경우 다시 복구할 수 없어요.
              </span>
            </div>
          </div>
        </Confirm>,
        false,
      );
      if (result) {
        await Promise.all(
          myBookmarkList.map((item: PostContentType) =>
            deleteAllBookMarkMutate.mutateAsync(item.postId),
          ),
        );
        router.refresh();
      }
    } catch (error) {
      console.error('북마크 삭제 실패');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayList = titleKeyword ? searchBookmarkList : myBookmarkList;

  if (isPending) {
    return (
      <>
        <div className="mx-auto flex h-full w-full flex-col items-center bg-gray-50">
          <div className="relative">
            <BookmarkInput
              ref={inputRef}
              value={keyword}
              onChange={handleSearchChange}
              onKeyDown={handleOnKeyDownSearch}
            />

            <div className="mb-[40px] mt-[84px] flex h-[41px] w-[1152px] flex-row justify-between">
              <SearchResultTitle
                keyword={titleKeyword}
                category={'북마크 목록'}
              />
              <button onClick={handleAllItem}>
                <p className="text-[18px] font-bold">모두 지우기</p>
              </button>
            </div>
          </div>
          <div className="h-screen"></div>
        </div>
        <ProgressModal>데이터 찾아오는중...</ProgressModal>
      </>
    );
  }

  if (isError) {
    return <div>오류발생</div>;
  }

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center bg-gray-50">
      <div className="relative">
        {/* 북마크 검색 */}
        <BookmarkInput
          ref={inputRef}
          value={keyword}
          onChange={handleSearchChange}
          onKeyDown={handleOnKeyDownSearch}
        />

        {/* 북마크 헤더 */}
        <div className="mb-[40px] mt-[84px] flex h-[41px] w-[1152px] flex-row justify-between">
          <SearchResultTitle keyword={titleKeyword} category={'북마크 목록'} />
          <button onClick={handleAllItem}>
            <p className="text-[18px] font-bold">모두 지우기</p>
          </button>
        </div>

        {/* 북마크 리스트 */}
        <section className="flex w-[1152px] flex-col gap-6">
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

          {myBookmarkList.length > 0 && (
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
    </div>
  );
};

export default BookMarkPage;
