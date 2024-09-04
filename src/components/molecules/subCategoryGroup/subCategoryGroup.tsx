'use client';

import { PropsWithChildren } from 'react';

const SubCategoryGroup = ({ children }: PropsWithChildren) => {
  return <section className="flex justify-between">{children}</section>;
};
export default SubCategoryGroup;
