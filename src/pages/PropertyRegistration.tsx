import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyRegistrationStepper from '../components/property-registration/PropertyRegistrationStepper';

const PropertyRegistration: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Anunciar novo imóvel</h1>
        <PropertyRegistrationStepper />
      </main>
      <Footer />
    </div>
  );
};

export default PropertyRegistration;
