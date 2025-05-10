import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="20" height="12" rx="2" fill="#1e2a44" />
      <path d="M16 6L6 14H26L16 6Z" fill="#2563eb" />
      <rect x="13" y="20" width="6" height="6" rx="1" fill="#2563eb" />
    </svg>
    <span className="text-xl font-bold text-navy-900 dark:text-white select-none">Imóveis Conecta</span>
  </div>
);

export default Logo; 