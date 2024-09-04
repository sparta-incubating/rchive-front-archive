import React from 'react';
import Image from 'next/image';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import useDropDownOpen from '@/hooks/useDropDownOpen';
import SearchInputContainer from '@/components/molecules/searchInput/searchInputContainer';
import SearchInputDropDown from '@/components/atoms/searchInput/searchInputDropDown';
import SearchInputDropDownItem from '@/components/atoms/searchInput/searchInputDropDownItem';
import SearchInputDropDownItemCard from '@/components/atoms/searchInput/searchInputDropDownItemCard';

interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  setKeyword,
  onSearch,
}) => {
  const { searchInputRef, handleSearchKeyDown } = useSearchKeyword(keyword);
  const {
    isOpen: isOpenSearchDropdown,
    dropdownRef,
    handleClick: handleClickSearchDropdown,
  } = useDropDownOpen();

  return (
    <SearchInputContainer onClick={handleClickSearchDropdown}>
      <input
        placeholder="어떤 자료를 찾고 계신가요?"
        className="w-full text-lg"
        ref={searchInputRef}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
      <SearchInputDropDown clicked={isOpenSearchDropdown} ref={dropdownRef}>
        <SearchInputDropDownItem variant="secondary">
          <SearchInputDropDownItemCard keyword={'REACT'} />
        </SearchInputDropDownItem>
      </SearchInputDropDown>
    </SearchInputContainer>
  );
};

export default SearchInput;
