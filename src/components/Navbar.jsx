import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">
          HONEX<span className="text-brand-cyan">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-brand-cyan transition-colors">About</a>
          <a href="#services" className="hover:text-brand-cyan transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-brand-cyan transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-brand-cyan transition-colors">Contact</a>
        </div>

        <div className="hidden md:block">
          <Button variant="primary">Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-300 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 mt-4 px-6 py-6 flex flex-col gap-4 overflow-hidden"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-medium">About</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-medium">Services</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-medium">Portfolio</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-medium">Contact</a>
            <Button variant="primary" className="mt-4 w-full">Get Started</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
