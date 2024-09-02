import { ComponentProps, ReactNode } from 'react';

interface ProfileDropDownMenuProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const ProfileDropDownMenu = ({
  children,
  ...props
}: ProfileDropDownMenuProps) => {
  return (
    <button
      className="w-full cursor-pointer rounded-[12px] px-3.5 py-5 text-left hover:bg-primary-50"
      {...props}
    >
      <span className="text-md text-left"> {children}</span>
    </button>
  );
};

export default ProfileDropDownMenu;
