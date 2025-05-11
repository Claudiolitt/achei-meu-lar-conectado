import React from 'react';

interface PropertyImagesFormProps {
  images: FileList | null;
  setImages: (files: FileList | null) => void;
  planImage: File | null;
  setPlanImage: (file: File | null) => void;
  handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlanImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PropertyImagesForm: React.FC<PropertyImagesFormProps> = ({
  images,
  setImages,
  planImage,
  setPlanImage,
  handleImagesChange,
  handlePlanImageChange,
}) => {
  return (
    <div className="space-y-4 col-span-2">
      <h2 className="text-xl font-semibold border-b pb-2">Imagens do Imóvel</h2>
      <div>
        <label className="block font-medium mb-1">Fotos do imóvel (máx. 10 imagens, até 5MB cada)*</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.from(images).map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Planta baixa (opcional, até 5MB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePlanImageChange}
        />
        {planImage && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(planImage)}
              alt="preview-plan"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImagesForm; 