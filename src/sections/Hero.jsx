import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Animated Gradient/Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.5, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight text-white">
            ELEVATE YOUR <br />
            <span className="text-gradient inline-block">DIGITAL PRESENCE</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          We build premium, ultra-modern web experiences that captivate audiences and drive results. High-end web development meets sophisticated design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" className="w-full sm:w-auto text-lg px-10 py-4">
            Start a Project
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto text-lg px-10 py-4">
            View Our Work
          </Button>
        </motion.div>
      </div>

      {/* Floating 3D-like elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[15%] w-24 h-24 rounded-2xl glass border-brand-cyan/30 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-[15%] w-32 h-32 rounded-full glass border-brand-purple/30 hidden lg:block"
      />
    </section>
  );
};

export default Hero;
