import { ComponentProps, ReactNode } from 'react';

interface OrderByButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  active: boolean;
}

const OrderByButton = ({ children, active, ...props }: OrderByButtonProps) => {
  return (
    <button {...props}>
      <span
        className={`text-lg font-bold ${active ? 'text-gray-900' : 'text-gray-500'}`}
      >
        {children}
      </span>
    </button>
  );
};

export default OrderByButton;
