import React from 'react';
import { motion } from 'framer-motion';
import { Send, Globe, MessageSquare, Mail, Link } from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build <br/><span className="text-gradient">the future.</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Ready to elevate your digital presence? We're currently taking on new projects. Fill out the form or reach out via our social channels.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:glow-cyan transition-all duration-300">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-purple hover:glow-purple transition-all duration-300">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:glow-cyan transition-all duration-300">
                <Mail size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-purple hover:glow-purple transition-all duration-300">
                <Link size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <form className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button variant="primary" type="submit" className="mt-4 flex gap-2 items-center self-start">
                Send Message <Send size={18} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
