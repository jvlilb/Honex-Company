import React, { Suspense, lazy, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Pricing from './sections/Pricing';
import FooterContact from './sections/FooterContact';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import HowWeWork from './sections/HowWeWork';
import CustomCursor from './components/CustomCursor';
import AdminVideoPanel from './components/AdminVideoPanel';
import { AppProvider, useAppContext } from './context/AppContext';

const Services = lazy(() => import('./sections/Services'));
const Work = lazy(() => import('./sections/Work'));
const AboutUs = lazy(() => import('./sections/AboutUs'));
const Privacy = lazy(() => import('./sections/Privacy'));
const PricingPage = lazy(() => import('./sections/PricingPage'));
const ContactUs = lazy(() => import('./sections/ContactUs'));

// Page transition variants — intentionally minimal to prevent black-screen flash.
// We do NOT animate exit to opacity:0 because AnimatePresence mode="wait" holds the
// outgoing element fully visible while transitioning, which briefly blacks out the screen.
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};


const AppContent = () => {
  const { activeView } = useAppContext();
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        {/* mode="sync" lets incoming/outgoing pages overlap — prevents black-screen gap
            that occurs with mode="wait" which holds the old page to opacity:0 first. */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              {renderView()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <FooterContact />
      {adminOpen && <AdminVideoPanel onClose={() => setAdminOpen(false)} />}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark/50 to-transparent pointer-events-none -z-10 hidden dark:block" />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <CustomCursor />
      <AppContent />
    </AppProvider>
  );
}

export default App;
