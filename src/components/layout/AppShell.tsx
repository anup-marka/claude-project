'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex relative z-10">
      {/* Sidebar */}
      <aside
        className={cn(
          'w-72 flex-shrink-0 relative',
          'flex flex-col',
          'animate-slide-in-left'
        )}
      >
        {/* Sidebar background with gradient */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-b from-bg-surface via-bg-deep to-bg-void',
            'border-r border-border-subtle'
          )}
        />

        {/* Glowing accent line */}
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-px',
            'bg-gradient-to-b from-neon-cyan/30 via-neon-purple/20 to-transparent'
          )}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {sidebar}
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          'flex-1 flex flex-col overflow-hidden relative',
          'animate-fade-in'
        )}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {children}
      </main>
    </div>
  );
}
