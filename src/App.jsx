import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Pricing from './sections/Pricing';
import FooterContact from './sections/FooterContact';
import Services from './sections/Services';
import Work from './sections/Work';
import AboutUs from './sections/AboutUs';
import Privacy from './sections/Privacy';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import HowWeWork from './sections/HowWeWork';
import PricingPage from './sections/PricingPage';
import ContactUs from './sections/ContactUs';
import { AppProvider, useAppContext } from './context/AppContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AppContent = () => {
  const { activeView } = useAppContext();

  const renderView = () => {
    switch (activeView) {
      case 'services':
        return <Services />;
      case 'work':
        return <Work isHome={false} />;
      case 'about':
        return <AboutUs />;
      case 'privacy':
        return <Privacy />;
      case 'pricing':
        return <PricingPage />;
      case 'contact':
        return <ContactUs />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Marquee />
            <Pricing isPage={false} />
            <WhyUs />
            <Work isHome={true} />
            <Testimonials />
            <HowWeWork />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-cyan/30 selection:text-brand-purple">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Footer Contact — always visible */}
      <FooterContact />
      {/* Decorative background blur */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark/50 to-transparent pointer-events-none -z-10 hidden dark:block" />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
