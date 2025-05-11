import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import PropertyBasicInfoForm from './PropertyBasicInfoForm';
import PropertyAddressForm from './PropertyAddressForm';
import PropertyFeaturesForm from './PropertyFeaturesForm';
import PropertyImagesForm from './PropertyImagesForm';
import { usePropertyRegistrationForm } from './usePropertyRegistrationForm';
import { Button } from '@/components/ui/button';

const steps = [
  'Informações Básicas',
  'Endereço',
  'Características do Imóvel',
  'Imagens',
];

const PropertyRegistrationStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    form,
    images,
    setImages,
    planImage,
    setPlanImage,
    onSubmit,
    handleImagesChange,
    handlePlanImageChange,
  } = usePropertyRegistrationForm();

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const handleSave = () => {
    // Lógica de salvar seção (pode ser adaptada depois)
    alert(`Seção "${steps[currentStep]}" salva!`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PropertyBasicInfoForm form={form} />;
      case 1:
        return <PropertyAddressForm form={form} />;
      case 2:
        return <PropertyFeaturesForm form={form} />;
      case 3:
        return (
          <PropertyImagesForm
            images={images}
            setImages={setImages}
            planImage={planImage}
            setPlanImage={setPlanImage}
            handleImagesChange={handleImagesChange}
            handlePlanImageChange={handlePlanImageChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      {/* Stepper visual */}
      <div className="flex items-center mb-8">
        {steps.map((label, idx) => (
          <React.Fragment key={label}>
            <div className={`flex flex-col items-center ${idx === currentStep ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx === currentStep ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-white'}`}>{idx + 1}</div>
              <span className="text-xs mt-1">{label}</span>
            </div>
            {idx < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-300 mx-2" />}
          </React.Fragment>
        ))}
      </div>

      {/* Conteúdo da etapa */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-8 min-h-[180px] flex items-center justify-center border rounded bg-gray-50 p-6">
            {renderStepContent()}
          </div>
          {/* Botões de navegação */}
          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >Anterior</button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >Salvar seção</button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded disabled:opacity-50"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >Próximo</button>
            ) : (
              <Button type="submit">Cadastrar Imóvel</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertyRegistrationStepper; 