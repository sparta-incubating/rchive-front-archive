import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

const profileImageVariants = cva('relative', {
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
}

const profileImage = ({ imageUrl, size }: ProfileImageProps) => {
  return (
    <div>
      <Image src={`/assets/icons/${imageUrl}.svg`} alt={'프로필 이미지'} fill />
    </div>
  );
};
export default profileImage;
