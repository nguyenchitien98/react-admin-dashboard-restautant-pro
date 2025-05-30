import React from 'react';

export function Separator({ className = '' }) {
  return <hr className={`border-t border-gray-200 my-2 ${className}`} />;
}