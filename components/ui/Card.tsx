import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-soft p-8 border border-gray-100
        ${hover ? 'hover:shadow-soft-lg transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
