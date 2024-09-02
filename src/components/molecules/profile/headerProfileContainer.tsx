'use client';

import ProfileImage from '@/components/atoms/profile/profileImage';
import Image from 'next/image';
import ProfileDropDown from '@/components/atoms/profile/profileDropDown';
import ProfileDropDownItem from '@/components/atoms/profile/profileDropDownItem';
import ProfileDropDownItemCard from '@/components/atoms/profile/ProfileDropDownItemCard';
import useDropDownOpen from '@/hooks/useDropDownOpen';

const HeaderProfileContainer = () => {
  const { isOpen, dropdownRef, handleClick } = useDropDownOpen();

  return (
    <article
      className="relative flex cursor-pointer gap-2.5 rounded-[14px] border border-gray-100 bg-gray-50 p-2"
      onClick={handleClick}
    >
      <ProfileImage imageUrl="/assets/icons/MRT_2.svg" size="sm" />

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-700">홍길동님</span>
        <div
          data-clicked={true}
          className="flex h-3.5 w-3.5 rotate-0 items-center justify-center transition-transform duration-500 ease-in-out data-[clicked=false]:rotate-0"
        >
          <Image
            src={'/assets/icons/selectArrow.svg'}
            alt={'select arrow icon'}
            fill
          />
        </div>
      </div>
      <ProfileDropDown clicked={isOpen} ref={dropdownRef}>
        <ProfileDropDownItem variant="primary" selected={true}>
          <ProfileDropDownItemCard
            profileImage={'/assets/icons/MRT_3.svg'}
            nickname="홍길동"
            role="APM"
            track="UI/UX 4기"
            selected={true}
          />
        </ProfileDropDownItem>
        <ProfileDropDownItem variant="primary">
          <ProfileDropDownItemCard
            profileImage={'/assets/icons/MRT_3.svg'}
            nickname="홍길동"
            role="APM"
            track="UI/UX 4기"
            selected={false}
          />
        </ProfileDropDownItem>
      </ProfileDropDown>
    </article>
  );
};
export default HeaderProfileContainer;
