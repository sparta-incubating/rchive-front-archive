'use client';

import { ComponentProps, PropsWithChildren } from 'react';

const SearchInputContainer = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<'div'>>) => {
  return (
    <section className="flex py-9">
      <article
        className="relative mx-auto flex h-[70px] w-[960px] items-center justify-between rounded-[43px] bg-white pl-12 shadow-searchInput"
        {...props}
      >
        {children}
      </article>
    </section>
  );
};

export default SearchInputContainer;
