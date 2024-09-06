'use client';

import { CategoryTabType } from '@/types/posts.types';
import { cva } from 'class-variance-authority';

const TagCategoryTapMenuVariants = cva(
  'text-md rounded-[20px] px-4 h-[42px] border',
  {
    variants: {
      variant: {
        default: 'border-blue-100 bg-white text-gray-500',
        active: 'border-gray-900 bg-gray-900 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TabProps {
  data: CategoryTabType[];
  activeTab: string;
  setActiveTab: (idx: string) => void;
}

const TagCategoryTapMenu = ({ data, activeTab, setActiveTab }: TabProps) => {
  return (
    <section className="relative w-full">
      <div className="relative flex gap-4">
        {data?.map((item) => (
          <button
            className={TagCategoryTapMenuVariants({
              variant: activeTab === item.id ? 'active' : 'default',
            })}
            key={item.title}
            type="button"
            onClick={() => setActiveTab(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagCategoryTapMenu;
