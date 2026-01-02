'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-10 px-4 text-sm rounded-lg font-body',
          'bg-bg-elevated/80 text-text-primary placeholder:text-text-muted',
          'border border-border-default',
          'focus:outline-none focus:border-neon-cyan/50',
          'transition-all duration-200',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
