import { cn } from '@/lib/utils';
import React from 'react'

export type FormFieldProps = TailWindProps & {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export const FormField = ({ label, labelClassName, children, className }: FormFieldProps) => {
  return (
    <div className={className}>
      <span className={cn("block mb-2", labelClassName)}>{label}</span>
      {children}
    </div>
  )
}
