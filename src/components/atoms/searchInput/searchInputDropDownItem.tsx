import { ComponentProps, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const ProfileDropDownItemVariants = cva(
  'group relative mx-3 flex cursor-pointer justify-between rounded-[12px] px-3.5 py-3',
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

interface SelectItemProps
  extends VariantProps<typeof ProfileDropDownItemVariants>,
    ComponentProps<'div'> {
  children: ReactNode;
}

const SearchInputDropDownItem = ({
  children,
  variant = 'primary',
  ...props
}: SelectItemProps) => {
  return (
    <div {...props} className={ProfileDropDownItemVariants({ variant })}>
      {children}
    </div>
  );
};

export default SearchInputDropDownItem;
