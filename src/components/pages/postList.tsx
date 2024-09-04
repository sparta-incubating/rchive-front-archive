'use client';

import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import CategoryGroup from '@/components/molecules/categoryGroup/categoryGroup';
import SubCategoryGroup from '@/components/molecules/subCategoryGroup/subCategoryGroup';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import PageNation from '@/components/atoms/pageNation';
import HelperButton from '@/components/atoms/helperButton';
import React, { useCallback, useEffect, useState } from 'react';
import { PostListResponse, SearchParamsType } from '@/types/posts.types';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import useSearchTutor from '@/hooks/useSearchTutor';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import CategoryCategory from '@/components/molecules/categorySelector';
import EmptyPage from '@/components/pages/emptyPage';
import { postTabArr } from '@/constatns/post.constant';
import Image from 'next/image';
import SearchInputDropDown from '@/components/atoms/searchInput/searchInputDropDown';
import SearchInputDropDownItem from '@/components/atoms/searchInput/searchInputDropDownItem';
import SearchInputDropDownItemCard from '@/components/atoms/searchInput/searchInputDropDownItemCard';
import useDropDownOpen from '@/hooks/useDropDownOpen';

interface PostListProps {
  searchParams: SearchParamsType;
  postListData: PostListResponse;
}

const PostList = ({ searchParams, postListData }: PostListProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tutor, setTutor] = useState<string>('0');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>(searchParams?.title || '');
  const {
    isOpen: isOpenSearchDropdown,
    dropdownRef,
    handleClick: handleClickSearchDropdown,
  } = useDropDownOpen();

  const {
    trackName,
    period: loginPeriod,
    trackRole: loginTrackRole,
  } = useAppSelector((state) => state.authSlice);

  // URL 파라미터를 유지하면서 업데이트하는 함수
  const updateQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      const query = new URLSearchParams(window.location.search);

      if (value && !(key === 'tutorId' && value === 'all')) {
        query.set(key, String(value));
      } else {
        query.delete(key);
      }

      if (key !== 'page') {
        setCurrentPage(1);
        query.set('page', '1');
      }

      router.push(`/?${query.toString()}`);
    },
    [router],
  );

  const getFetchTutors = useSearchTutor(trackName, loginPeriod, loginPeriod);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateQueryParams('postType', newTab);
  };
  const { searchInputRef, handleSearchKeyDown } = useSearchKeyword(
    searchParams?.title,
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  const handleKeywordSearch = () => {
    updateQueryParams('title', keyword);
  };

  /*const handleOrderBy = () => {
    setOrderBy((prev) =>
      prev === OrderByEnum.NEW ? OrderByEnum.POPULAR : OrderByEnum.NEW,
    );
  };*/

  useEffect(() => {
    if (getFetchTutors) {
      if (getFetchTutors.length > 0 && tutor === '0') {
        const defaultTutor = getFetchTutors.find(
          (tutor) => tutor.value === searchParams?.tutorId,
        );
        if (defaultTutor) {
          setTutor(defaultTutor.value);
          updateQueryParams('tutorId', defaultTutor.value);
        }
      }
    }
  }, [getFetchTutors, tutor, searchParams?.tutorId, updateQueryParams]);

  return (
    <div className="relative">
      <SearchInputContainer onClick={handleClickSearchDropdown}>
        <input
          placeholder="어떤 자료를 찾고 계신가요?"
          className="w-full text-lg"
          ref={searchInputRef}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            handleSearchKeyDown(e);
            if (e.key === 'Enter') {
              handleKeywordSearch();
            }
          }}
        />
        <button
          type="button"
          className="flex h-[50px] w-[83px] items-center justify-center rounded-[32px]"
          onClick={handleKeywordSearch}
        >
          <div className="relative flex h-5 w-5">
            <Image
              src={'/assets/icons/searchButton.svg'}
              alt={'검색버튼'}
              fill
            />
          </div>
        </button>

        {/*dropdown menu*/}
        <SearchInputDropDown clicked={isOpenSearchDropdown} ref={dropdownRef}>
          <SearchInputDropDownItem variant="secondary">
            <SearchInputDropDownItemCard keyword={'REACT'} />
          </SearchInputDropDownItem>
        </SearchInputDropDown>
      </SearchInputContainer>
      <section className="flex flex-col gap-6">
        <CategoryGroup
          keyword={searchParams?.title || ''}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        {postListData.data.totalElements > 0 ? (
          <>
            <SubCategoryGroup>
              <CategoryCategory
                label="튜터"
                filterData={getFetchTutors || []}
                defaultValue={tutor}
                setValue={(value) => {
                  setTutor(value);
                  updateQueryParams('tutorId', value);
                }}
              />
              {/*<OrderByButtonGroup orderBy={orderBy} onClick={handleOrderBy} />*/}
            </SubCategoryGroup>
            <PostListContainer postListData={postListData} />
            <PageNation
              currentPage={currentPage}
              totalElements={postListData.data.totalElements}
              size={postListData.data.size}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyPage>
            {searchParams?.title
              ? searchParams?.title
              : postTabArr.find((category) => category.id === activeTab)?.title}
          </EmptyPage>
        )}
      </section>
      <HelperButton />
    </div>
  );
};
export default PostList;
