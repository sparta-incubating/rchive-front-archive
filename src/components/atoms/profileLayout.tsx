import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const ProfileBoardVariants = cva(
  'blue-500 rounded-[14px] border bg-white w-[1152px] px-[36px] py-[32px] shadow-myPageShadow',
  {
    variants: {
      variant: {
        primary: '',
        userInfo: 'h-[290px] ',
        accountInfo: 'min-h-[248px] ',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface ProfileLayoutProps
  extends VariantProps<typeof ProfileBoardVariants>,
    ComponentProps<'div'> {
  children: ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  variant,
  ...props
}: ProfileLayoutProps) => {
  return (
    <div {...props} className={ProfileBoardVariants({ variant })}>
      {children}
    </div>
  );
};

export default ProfileLayout;
