import React from 'react';
import { motion } from 'framer-motion';

const portfolioItems = [
  {
    title: "Aura E-Commerce",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Nexus Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Lumina Agency",
    category: "Branding & Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    title: "Vortex Fintech",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1616077168079-7e0908d07656?q=80&w=2070&auto=format&fit=crop"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 relative z-10 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected <span className="text-gradient">Work</span></h2>
            <p className="text-gray-400 text-lg max-w-xl">A glimpse into our premium portfolio of digital products and marketing campaigns.</p>
          </div>
          <button className="text-brand-cyan hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold pb-2 border-b border-brand-cyan hover:border-white">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index % 2 === 1 ? 'md:mt-16' : ''}`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-cyan text-sm font-semibold tracking-wider mb-2 uppercase">{item.category}</p>
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
