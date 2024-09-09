import React, { ReactNode } from 'react';

interface ProfileDropDownProps {
  children: ReactNode;
  clicked: boolean;
}

const SearchInputDropDown = React.forwardRef<
  HTMLDivElement,
  ProfileDropDownProps
>(({ children, clicked }, ref) => {
  return (
    <article
      ref={ref}
      data-clicked={clicked}
      className="transition-height absolute -bottom-0.5 left-0 z-30 h-auto w-full translate-y-full rounded-[12px] bg-white shadow-searchDropDown duration-500 ease-in-out scrollbar-hide data-[clicked=false]:max-h-0 data-[clicked=true]:max-h-[710px] data-[clicked=false]:overflow-hidden data-[clicked=true]:overflow-y-scroll"
    >
      <div className="h-auto max-h-[453px] overflow-y-scroll py-[14px] scrollbar-hide">
        {children}
      </div>
    </article>
  );
});

SearchInputDropDown.displayName = 'SearchInputDropDown';
export default SearchInputDropDown;
