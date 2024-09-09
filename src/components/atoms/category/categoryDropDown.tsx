import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute left-0 w-[137px]', {
  variants: {
    variant: {
      permission: 'top-[38px]',
      category: 'top-[26px]',
    },
  },
  defaultVariants: {
    variant: 'permission',
  },
});

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
  show: boolean;
  isClicked?: boolean;
}

const CategoryDropDown = React.forwardRef<HTMLDivElement, DivProps>(
  (
    { children, className, variant, show, isClicked = false, ...props },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classMerge(
          divVariants({ variant }),
          className,
          show ? 'z-30 block' : 'hidden',
        )}
      >
        <div
          className={`flex h-auto w-full flex-col items-center overflow-y-scroll rounded-[14px] border bg-white px-3 py-[14px] scrollbar-hide ${
            isClicked ? 'max-h-[64px]' : 'max-h-[208px]'
          }`}
          data-clicked={isClicked}
        >
          {children}
        </div>
      </div>
    );
  },
);

CategoryDropDown.displayName = 'CategoryDropDown';

export default CategoryDropDown;
