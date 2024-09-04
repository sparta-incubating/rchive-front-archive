'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import { SelectOptionType } from '@/types/signup.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CategoryLayout from '@/components/atoms/category/categoryLayout';
import CategoryContainer from '@/components/atoms/category/categoryContainer';
import CategorySelectLabel from '@/components/atoms/category/categorySelectLabel';
import CategoryDropDown from '@/components/atoms/category/categoryDropDown';

interface FilterCategoryProps {
  label: string;
  filterData: SelectOptionType[];
  setValue: (value: SelectOptionType['value']) => void;
  defaultValue: string;
}

const CategoryCategory = ({
  label,
  filterData,
  setValue,
  defaultValue,
}: FilterCategoryProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectOptionType | null>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (data: SelectOptionType) => {
    setSelectedItem(data);
    setValue(data.value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (defaultValue !== '0') {
      setSelectedItem(filterData.find((data) => data.value === defaultValue));
    }
  }, [defaultValue, filterData]);

  return (
    <CategoryContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <CategoryLayout>
        <CategorySelectLabel>
          {selectedItem ? selectedItem.label : label}
        </CategorySelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </CategoryLayout>

      <CategoryDropDown show={isDropdownOpen}>
        <div
          className="flex h-[36px] w-full items-center rounded-[8px] px-[14px] py-[9px] hover:bg-secondary-55"
          key={0}
          onClick={() =>
            handleClick({ value: 'all', label: '전체', selected: false })
          }
        >
          <p
            className={`text-sm ${selectedItem?.value === 'all' ? 'text-secondary-500' : 'text-black'}`}
          >
            전체
          </p>
          {selectedItem?.value === 'all' && (
            <Image src={select} width={16} height={12} alt="선택됨" />
          )}
        </div>
        {filterData &&
          filterData.map((data) => (
            <div
              className="flex h-[36px] w-full items-center rounded-[8px] px-[14px] py-[9px] hover:bg-secondary-55"
              key={data.value}
              onClick={() => handleClick(data)}
            >
              <p
                className={`text-sm ${selectedItem?.value === data.value ? 'text-secondary-500' : 'text-black'}`}
              >
                {data.label}
              </p>
              {selectedItem?.value === data.value && (
                <Image src={select} width={16} height={12} alt="선택됨" />
              )}
            </div>
          ))}
      </CategoryDropDown>
    </CategoryContainer>
  );
};

export default CategoryCategory;
