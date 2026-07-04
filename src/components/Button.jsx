import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full overflow-hidden transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-brand-cyan text-brand-dark hover:glow-cyan",
    secondary: "bg-transparent border border-gray-600 text-gray-200 hover:border-gray-400 glass-hover",
    neonPurple: "bg-brand-purple text-white hover:glow-purple"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
};

export default Button;
