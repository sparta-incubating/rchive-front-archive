import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/utils/utils';

const profileImageVariants = cva('relative overflow-hidden', {
  variants: {
    size: {
      sm: 'h-6 w-6 rounded-[8px]',
      lg: 'h-9 w-9 rounded-[9px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  imageUrl: string;
  className?: string;
}

const profileImage = ({ imageUrl, className, size }: ProfileImageProps) => {
  return (
    <div className={classMerge(profileImageVariants({ size }), className)}>
      <Image src={`${imageUrl}`} alt={'프로필 이미지'} fill />
    </div>
  );
};
export default profileImage;
