import React from 'react'

export type FormFieldProps = TailWindProps & {
  label: string;
  children: React.ReactNode;
};

export const FormField = ({ label, children, className }: FormFieldProps) => {
  return (
    <div className={className}>
      <span className="block mb-2">{label}</span>
      {children}
    </div>
  )
}
