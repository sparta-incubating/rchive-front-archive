'use client';

import React from 'react';
import Image from 'next/image';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import useDropDownOpen from '@/hooks/useDropDownOpen';
import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import SearchInputDropDown from '@/components/atoms/searchInput/searchInputDropDown';
import SearchInputDropDownItem from '@/components/atoms/searchInput/searchInputDropDownItem';
import SearchInputDropDownItemCard from '@/components/atoms/searchInput/searchInputDropDownItemCard';
import useRecentSearchHistory from '@/hooks/useRecentSearchHistory';
import { useAppSelector } from '@/redux/storeConfig';
import { useQueryClient } from '@tanstack/react-query';
import { RECENT_SEARCH_KEY } from '@/api/signup/keys.constant';

interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
  handleSearchClick: (
    e: React.MouseEvent<HTMLDivElement>,
    keyword: string,
  ) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  setKeyword,
  onSearch,
  handleSearchClick,
}) => {
  const { searchInputRef, handleSearchKeyDown } = useSearchKeyword(keyword);
  const { trackName, period } = useAppSelector((state) => state.authSlice);
  const queryClient = useQueryClient();

  const {
    isOpen: isOpenSearchDropdown,
    dropdownRef,
    handleClick: handleClickSearchDropdown,
  } = useDropDownOpen();

  const { recentSearchData, deleteRecentMutation } = useRecentSearchHistory();
  const handleDeleteRecentSearch = (
    e: React.MouseEvent<HTMLButtonElement>,
    trackName: string,
    period: number,
    keyword: string,
  ) => {
    e.stopPropagation();

    deleteRecentMutation.mutate(
      { trackName, period, keyword },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [RECENT_SEARCH_KEY],
          });
        },
      },
    );
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^.{0,255}$/.test(inputValue)) {
      setKeyword(inputValue);
    }
  };

  return (
    <SearchInputContainer onClick={handleClickSearchDropdown}>
      <input
        placeholder="어떤 자료를 찾고 계신가요?"
        className="w-full text-lg"
        ref={searchInputRef}
        value={keyword}
        onChange={handleKeywordChange}
        onKeyDown={(e) => {
          handleSearchKeyDown(e);
          if (e.key === 'Enter') onSearch();
        }}
      />

      <button
        type="button"
        className="flex h-[50px] w-[83px] items-center justify-center rounded-[32px]"
        onClick={onSearch}
      >
        <div className="relative flex h-5 w-5">
          <Image src={'/assets/icons/searchButton.svg'} alt={'검색버튼'} fill />
        </div>
      </button>

      {!!recentSearchData?.data && (
        <SearchInputDropDown clicked={isOpenSearchDropdown} ref={dropdownRef}>
          {recentSearchData?.data.map((item, index) => (
            <SearchInputDropDownItem
              key={item.keyword + index}
              variant="secondary"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                handleSearchClick(e, item.keyword)
              }
            >
              <SearchInputDropDownItemCard
                keyword={item.keyword}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleDeleteRecentSearch(
                    e,
                    trackName,
                    Number(period),
                    item.keyword,
                  )
                }
              />
            </SearchInputDropDownItem>
          ))}
        </SearchInputDropDown>
      )}
    </SearchInputContainer>
  );
};

export default SearchInput;
