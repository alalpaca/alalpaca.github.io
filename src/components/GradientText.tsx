import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-block py-1 bg-gradient-to-r from-primary-600 via-blue-500 to-primary-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-flow ${className}`}
      style={{ lineHeight: 1.4 }}
    >
      {children}
    </span>
  );
}
