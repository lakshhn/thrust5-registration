import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import FloatingMobileCTA from './components/FloatingMobileCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-body selection:bg-[#29ABE2] selection:text-[#0D1117]">
      <Navbar />
      <main>
        <Hero />
        <EventDetails />
        <RegistrationForm />
      </main>
      <Footer />
      <FloatingMobileCTA />
    </div>
  );
}
