import { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';

interface TagNameProps extends ComponentProps<typeof Link> {
  children: ReactNode;
}

const TagName = ({ children, ...props }: TagNameProps) => {
  return (
    <Link {...props}>
      <span className="whitespace-nowrap text-sm font-medium text-toast-color">
        {children}
      </span>
    </Link>
  );
};

export default TagName;
