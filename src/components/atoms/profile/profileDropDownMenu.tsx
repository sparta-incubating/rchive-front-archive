import { ComponentProps, ReactNode } from 'react';
import { classMerge } from '@/utils/utils';

interface ProfileDropDownMenuProps extends ComponentProps<'button'> {
  children: ReactNode;
  border?: boolean;
}

const ProfileDropDownMenu = ({
  children,
  border,
  ...props
}: ProfileDropDownMenuProps) => {
  return (
    <button
      className={classMerge(
        'w-full cursor-pointer rounded-[12px] px-3.5 py-5 text-left hover:bg-primary-50',
        border ? 'border-b border-gray-100' : '',
      )}
      {...props}
    >
      <span className="text-md text-left"> {children}</span>
    </button>
  );
};

export default ProfileDropDownMenu;
