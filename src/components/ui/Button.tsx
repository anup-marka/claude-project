'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-body font-medium',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Primary - glowing accent button
            'bg-neon-cyan text-bg-void hover:bg-neon-cyan/90 hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]':
              variant === 'primary',
            // Secondary - subtle bordered
            'bg-bg-elevated/80 text-text-primary border border-border-default hover:border-border-glow hover:bg-bg-hover':
              variant === 'secondary',
            // Ghost - minimal
            'text-text-secondary hover:text-text-primary hover:bg-bg-hover/60':
              variant === 'ghost',
          },
          {
            'h-8 px-3 text-xs rounded-lg': size === 'sm',
            'h-10 px-4 text-sm rounded-lg': size === 'md',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
