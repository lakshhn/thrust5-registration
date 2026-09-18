import React, { useState } from 'react';
import RegistrationClosed from './components/RegistrationClosed';

// Retained and kept safe for 1-click re-opening:
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import FloatingMobileCTA from './components/FloatingMobileCTA';

/**
 * Toggle this constant to false when registrations are reopened.
 * All registration form logic, validation, and Google Sheet pipelines
 * are preserved and intact.
 */
export const IS_REGISTRATION_CLOSED = true;

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (IS_REGISTRATION_CLOSED) {
    return <RegistrationClosed />;
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-body selection:bg-[#29ABE2] selection:text-[#0D1117]">
      <Navbar />
      <main>
        <Hero />
        <EventDetails />
        <RegistrationForm onSubmittedStateChange={setIsSubmitted} />
      </main>
      <Footer />
      <FloatingMobileCTA isSubmitted={isSubmitted} />
    </div>
  );
}
