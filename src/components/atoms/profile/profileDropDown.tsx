import React, { ReactNode } from 'react';
import ProfileDropDownMenu from '@/components/atoms/profile/profileDropDownMenu';

interface ProfileDropDownProps {
  children: ReactNode;
  clicked: boolean;
}

const ProfileDropDown = React.forwardRef<HTMLDivElement, ProfileDropDownProps>(
  ({ children, clicked }, ref) => {
    return (
      <article
        ref={ref}
        data-clicked={clicked}
        className="transition-height absolute -bottom-0.5 left-0 z-30 h-auto w-[300px] translate-y-full rounded-[12px] bg-white shadow-selectBox duration-500 ease-in-out scrollbar-hide data-[clicked=false]:max-h-0 data-[clicked=true]:max-h-[710px] data-[clicked=false]:overflow-hidden data-[clicked=true]:overflow-y-scroll"
      >
        <div className="h-auto max-h-[453px] overflow-y-scroll py-[14px] scrollbar-hide">
          {children}
        </div>

        <div className="flex flex-col items-start border-t border-gray-100 px-3 py-3.5">
          <ProfileDropDownMenu border={false}>북마크 목록</ProfileDropDownMenu>
          <ProfileDropDownMenu border={true}>프로필 관리</ProfileDropDownMenu>
          <ProfileDropDownMenu border={false}>로그아웃</ProfileDropDownMenu>
        </div>
      </article>
    );
  },
);

export default ProfileDropDown;