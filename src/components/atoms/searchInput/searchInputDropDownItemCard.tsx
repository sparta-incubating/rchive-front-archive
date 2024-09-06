import Image from 'next/image';
import { ComponentProps } from 'react';

interface SearchInputDropDownItemCardProps extends ComponentProps<'button'> {
  keyword: string;
}

const SearchInputDropDownItemCard = ({
  keyword,
  ...props
}: SearchInputDropDownItemCardProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="relative h-5 w-5">
        <Image
          src={'/assets/icons/clock-arrow.svg'}
          alt={'최근검색 아이콘'}
          fill
        />
      </div>
      <span className="flex-1 font-medium group-hover:font-bold">
        {keyword}
      </span>
      <div className="group flex h-[24.02px] w-[24.02px] items-center justify-center rounded-full hover:bg-secondary-100">
        <button
          type="button"
          className="relative h-[10.3px] w-[10.3px]"
          {...props}
        >
          <Image
            src={'/assets/icons/searchDeleteButton.svg'}
            alt={'최근검색 삭제 아이콘'}
            className="group-hover:hidden"
            fill
          />
          <Image
            src={'/assets/icons/searchDeleteButton-hover.svg'}
            alt={'최근검색 삭제 아이콘 (호버)'}
            className="hidden group-hover:block"
            fill
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInputDropDownItemCard;
