import React, { ComponentProps, ForwardedRef } from 'react';
import SearchInputContainer from '../molecules/searchInput/searchInputContainer';
import Image from 'next/image';

interface InputProps extends ComponentProps<'input'> {}

const BookmarkInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="p-[12px]">
        <SearchInputContainer>
          <input
            placeholder="어떤 자료를 찾고 계신가요?"
            className="w-full text-lg"
            {...props}
            ref={ref}
            type="text"
          />

          <button
            type="button"
            className="flex h-[50px] w-[83px] items-center justify-center rounded-[32px]"
          >
            <div className="relative flex h-5 w-5">
              <Image
                src={'/assets/icons/searchButton.svg'}
                alt={'검색버튼'}
                fill
              />
            </div>
          </button>
        </SearchInputContainer>
      </div>
    );
  },
);

BookmarkInput.displayName = 'BookmarkInput';
export default BookmarkInput;
