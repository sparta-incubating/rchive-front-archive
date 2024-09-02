import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { classMerge } from '@/utils/utils';

const profileRoleBadgeVariants = cva(
  'w-9 h-[22px] rounded-[4px] flex justify-center items-center',
  {
    variants: {
      variant: {
        selected: 'bg-primary-50 text-primary-400',
        default: 'bg-blue-55 text-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ProfileRoleBadgeProps
  extends VariantProps<typeof profileRoleBadgeVariants> {
  children: ReactNode;
  className?: string;
}

const ProfileRoleBadge = ({
  children,
  variant,
  className,
}: ProfileRoleBadgeProps) => {
  return (
    <article
      className={classMerge(profileRoleBadgeVariants({ variant }), className)}
    >
      <span className="text-xs">{children}</span>
    </article>
  );
};

export default ProfileRoleBadge;
