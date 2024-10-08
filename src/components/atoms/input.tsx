import React, { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  customProp?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <input {...props} ref={ref} />;
  },
);

Input.displayName = 'Input';

export default Input;
