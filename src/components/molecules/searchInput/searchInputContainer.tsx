'use client';

import Image from 'next/image';
import SearchInputDropDown from '@/components/atoms/searchInput/searchInputDropDown';
import useDropDownOpen from '@/hooks/useDropDownOpen';
import SearchInputDropDownItem from '@/components/atoms/searchInput/searchInputDropDownItem';
import SearchInputDropDownItemCard from '@/components/atoms/searchInput/searchInputDropDownItemCard';

const SearchInputContainer = () => {
  const { isOpen, dropdownRef, handleClick } = useDropDownOpen();

  return (
    <section className="flex py-9">
      <article
        className="relative mx-auto flex h-[70px] w-[960px] items-center justify-between rounded-[43px] pl-12 shadow-searchInput"
        onClick={handleClick}
      >
        <input
          placeholder="어떤 자료를 찾고 계신가요?"
          className="w-full text-lg"
        />
        <button className="flex h-[50px] w-[83px] items-center justify-center rounded-[32px]">
          <div className="relative flex h-5 w-5">
            <Image
              src={'/assets/icons/searchButton.svg'}
              alt={'검색버튼'}
              fill
            />
          </div>
        </button>

        {/*dropdown menu*/}
        <SearchInputDropDown clicked={isOpen} ref={dropdownRef}>
          <SearchInputDropDownItem variant="secondary">
            <SearchInputDropDownItemCard keyword={'REACT'} />
          </SearchInputDropDownItem>
        </SearchInputDropDown>
      </article>
    </section>
  );
};

export default SearchInputContainer;
