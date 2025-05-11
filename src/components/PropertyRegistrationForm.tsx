import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PropertyBasicInfoForm from './property-registration/PropertyBasicInfoForm';
import PropertyAddressForm from './property-registration/PropertyAddressForm';
import PropertyFeaturesForm from './property-registration/PropertyFeaturesForm';
import PropertyImagesForm from './property-registration/PropertyImagesForm';
import { usePropertyRegistrationForm } from './property-registration/usePropertyRegistrationForm';

const PropertyRegistrationForm: React.FC = () => {
  const {
    form,
    images,
    setImages,
    planImage,
    setPlanImage,
    listingType,
    setListingType,
    onSubmit,
    handleImagesChange,
    handlePlanImageChange,
  } = usePropertyRegistrationForm();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyBasicInfoForm form={form} />
            <PropertyAddressForm form={form} />
            <PropertyFeaturesForm form={form} />
            <PropertyImagesForm
              images={images}
              setImages={setImages}
              planImage={planImage}
              setPlanImage={setPlanImage}
              handleImagesChange={handleImagesChange}
              handlePlanImageChange={handlePlanImageChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit">Cadastrar Imóvel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertyRegistrationForm;
