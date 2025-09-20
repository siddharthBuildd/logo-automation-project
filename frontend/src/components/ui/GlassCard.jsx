import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  dark = false,
  onClick,
  ...props 
}) => {
  const baseClasses = dark ? 'glass-dark' : 'glass';
  const hoverClasses = hover ? 'glass-hover cursor-pointer' : '';
  
  return (
    <div
      className={`${baseClasses} ${hoverClasses} rounded-2xl p-6 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
