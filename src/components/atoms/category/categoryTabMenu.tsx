'use client';

import { CategoryTabType } from '@/types/posts.types';

type TabProps = {
  data: CategoryTabType[];
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const CategoryTapMenu = ({ data, activeTab, setActiveTab }: TabProps) => {
  const handleTabChange = (idx: string) => {
    setActiveTab(idx);
  };

  return (
    <section className="relative w-full after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-200">
      <div className="relative flex">
        {data?.map((item) => (
          <button
            className={`group relative flex h-[48px] items-center justify-center gap-[10px] border-b px-4 py-2.5 font-light ${
              activeTab === item.id
                ? 'z-10 border-b-2 border-gray-900 font-bold'
                : 'border-transparent'
            }`}
            key={item.title}
            type="button"
            onClick={() => handleTabChange(item.id)}
          >
            <p
              className={`text-md group-hover:font-bold group-hover:text-gray-900 ${
                activeTab === item.id
                  ? 'font-bold text-gray-900'
                  : 'font-medium text-gray-500'
              }`}
            >
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryTapMenu;
