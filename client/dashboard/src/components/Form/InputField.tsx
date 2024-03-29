import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'date';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  focusable?: boolean;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error, focusable } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        autoFocus={focusable}
        type={type}
        placeholder={`Input a ${type}`}
        className={clsx(
          'appearance-none text-midnight block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
