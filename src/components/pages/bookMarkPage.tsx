'use client';

import React, { useCallback } from 'react';

import { useBookmarkQuery } from '@/api/bookmark/useQuery';
import PostCard from '../molecules/post/postCard';
import PageNation from '../atoms/pageNation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostContentType } from '@/types/posts.types';
import SearchInput from '../organisms/searchInput';
import HelperButton from '../atoms/helperButton';

const BookMarkPage = () => {
  const { bookmarkList, isPending, isError } = useBookmarkQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 16;

  const updateQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      const query = new URLSearchParams(searchParams.toString());
      if (value && !(key === 'postId' && value === 'all')) {
        query.set(key, String(value));
      } else {
        query.delete(key);
      }

      if (key !== 'page') {
        query.set('page', '1');
      }

      router.push(`${pathname}?${query.toString()}`);
    },
    [router, searchParams, pathname],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams('page', page);
    },
    [updateQueryParams],
  );

  const List = bookmarkList?.data || [];
  const myBookmarkList = List.map((item: PostContentType) => ({
    ...item,
    isBookmarked: true,
  }));

  if (isPending) {
    return <div>대기중</div>;
  }

  if (isError) {
    return <div>오류발생</div>;
  }

  return (
    // <div className="mx-auto flex w-full flex-col items-center justify-center gap-[40px] bg-gray-50">
    //   <br />
    //   <p onClick={handleAllItem}>모두 삭제</p>
    //   <div className="relative">
    //     <section className="flex flex-col gap-6">

    //     </section>
    //   </div>
    // </div>

    <div className="relative">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleKeywordSearch}
        handleSearchClick={handleSearchClick}
      />
      <section className="flex flex-col gap-6">
        {myBookmarkList && myBookmarkList.length > 0 ? (
          <>
            <section className="mx-auto mb-14">
              <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {myBookmarkList.map((item: PostContentType) => (
                  <PostCard postData={item} key={item.postId} />
                ))}
              </div>
            </section>
            <PageNation
              currentPage={currentPage}
              totalElements={List.length}
              size={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p>리스트가 없음</p>
        )}
      </section>
      <HelperButton />
    </div>
  );
};

export default BookMarkPage;
