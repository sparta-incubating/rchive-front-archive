'use client';

import CustomDropDown from '../atoms/customDropDown';
import SelectContainer from '../atoms/select/selectContainer';
import SelectInput from '../atoms/select/selectInput';
import SelectItem from '../atoms/select/selectItem';
import SelectLabel from '../atoms/select/selectLabel';
import SelectLayout from '../atoms/select/selectLayout';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { SelectOptionType } from '@/types/signup.types';
import { useEffect, useState } from 'react';

interface SelectBoxProps {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  value: string;
  disabled?: boolean;
}

const SelectFormBox = ({
  options,
  label,
  onSelect,
  variant,
  className,
  value,
  disabled,
}: SelectBoxProps) => {
  const { isOpen, setIsOpen, dropdownRef, handleClick } =
    useDropDownOutsideClick();

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.value === value) || null,
  );

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  // 초기값이 있다면 초기값을 선택한 상태로 만들어줌
  useEffect(() => {
    const option = options.find((option) => option.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  return (
    <SelectContainer className={className}>
      <SelectLayout label={label}>
        <SelectLabel>{label}</SelectLabel>
        {!disabled ? (
          <SelectInput
            variant={selectedOption ? 'selected' : 'unSelected'}
            onClick={handleClick}
            clicked={isOpen}
          >
            {selectedOption ? selectedOption.label : '선택안함'}
          </SelectInput>
        ) : (
          <SelectInput
            variant={selectedOption ? 'selected' : 'unSelected'}
            clicked={isOpen}
          >
            {`${value ? `기` : `트랙을 먼저 선택하세요`}`}
          </SelectInput>
        )}

        <CustomDropDown ref={dropdownRef} clicked={isOpen}>
          {options.map((option) => (
            <SelectItem
              key={option.value + option.label}
              data-value={option.value}
              selected={option.value === selectedOption?.value}
              variant={variant}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </SelectItem>
          ))}
        </CustomDropDown>
      </SelectLayout>
    </SelectContainer>
  );
};

export default SelectFormBox;
