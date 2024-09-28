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
import { useConfirmContext } from '@/context/useConfirmContext';
import Confirm from '../atoms/confirm';
import { useRouter } from 'next/navigation';

const BookMarkPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(
    Number(BOOKMARK_DEFAULT_PAGE),
  );

  const { bookmarkList, isPending, isError } = useBookmarkQuery();
  const { deleteBookMarkMutate } = useBookmarkUpdate();
  const { searchList } = useSearchBookmarkQuery(titleKeyword);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const myBookmarkList = bookmarkList?.data || [];

  const confirm = useConfirmContext();

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
    const result = await confirm.handleConfirm(
      <Confirm text="거절">
        <div className="flex flex-col gap-2.5">
          <span className="text-center text-xl font-bold">
            요청을 거절하시겠어요?
          </span>
          <div className="flex flex-col justify-center">
            <span className="text-center text-base font-medium text-gray-600">
              거절할 경우 권한 설정 목록에서 사라지고,
            </span>
            <span className="text-center text-base font-medium text-gray-600">
              다시 트랙 및 기수를 요청하게 돼요.
            </span>
          </div>
        </div>
      </Confirm>,
      false,
    );
    if (result) {
      myBookmarkList.forEach((item: PostContentType) => {
        deleteBookMarkMutate.mutateAsync(item.postId);
      });
      router.refresh();
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

  const displayList = titleKeyword ? searchBookmarkList : myBookmarkList;

  return (
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
