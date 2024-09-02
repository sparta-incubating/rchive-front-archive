'use client';

import CategoryCategory from '@/components/molecules/categorySelector';
import { useState } from 'react';
import { tutorMockData } from '@/constatns/post.constant';
import OrderByButtonGroup from '@/components/molecules/categoryGroup/orderByButtonGroup';
import { OrderByEnum } from '@/types/posts.types';

const SubCategoryGroup = () => {
  const [tutor, setTutor] = useState<string>('');
  const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.NEW);

  const handleOrderBy = () => {
    setOrderBy((prev) =>
      prev === OrderByEnum.NEW ? OrderByEnum.POPULAR : OrderByEnum.NEW,
    );
  };

  return (
    <section className="flex justify-between">
      <CategoryCategory
        label="튜터"
        filterData={tutorMockData}
        setValue={(value) => setTutor(value)}
        defaultValue="0"
      />
      <OrderByButtonGroup orderBy={orderBy} onClick={handleOrderBy} />
    </section>
  );
};
export default SubCategoryGroup;
