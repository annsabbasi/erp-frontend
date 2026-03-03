'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
  className?: string;
}

export function LoadingSpinner({ fullPage, message, className }: LoadingSpinnerProps) {
  const spinner = (
    <span
      className={cn(
        'inline-block border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin',
        fullPage ? 'w-10 h-10' : 'w-5 h-5',
        className
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        {spinner}
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
    );
  }

  return spinner;
}
