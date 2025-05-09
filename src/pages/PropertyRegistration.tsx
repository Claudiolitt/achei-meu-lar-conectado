
import React from 'react';
import PropertyRegistrationForm from '../components/PropertyRegistrationForm';

const PropertyRegistration: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Cadastrar novo imóvel</h1>
      <PropertyRegistrationForm />
    </div>
  );
};

export default PropertyRegistration;
