import { ReactNode } from 'react';
import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

const ProfileDropDownItemVariants = cva(
  'relative mx-3 flex cursor-pointer justify-between rounded-[12px] px-[14px] py-5 ',
  {
    variants: {
      variant: {
        primary: 'hover:bg-primary-50',
        secondary: 'hover:bg-secondary-55',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface ProfileDropDownItemProps
  extends VariantProps<typeof ProfileDropDownItemVariants> {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const ProfileDropDownItem = ({
  children,
  onClick,
  selected = false,
  variant = 'primary',
}: ProfileDropDownItemProps) => {
  return (
    <div onClick={onClick} className={ProfileDropDownItemVariants({ variant })}>
      {children}
      <div
        data-selected={selected}
        className="absolute right-[14px] top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center data-[selected=false]:hidden"
      >
        <Image
          src={`${variant === 'primary' ? '/assets/icons/redCheck.svg' : '/assets/icons/blueCheck.svg'}`}
          alt={'select box check'}
          fill
        />
      </div>
    </div>
  );
};

export default ProfileDropDownItem;
