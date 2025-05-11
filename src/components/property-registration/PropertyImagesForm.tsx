import React, { useRef, useState } from 'react';
import { X, Upload, FileImage } from 'lucide-react';

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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const planInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dt = new DataTransfer();
      Array.from(e.dataTransfer.files).slice(0, 10).forEach(f => dt.items.add(f));
      setImages(dt.files);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Remover imagem
  const handleRemoveImage = (idx: number) => {
    if (!images) return;
    const dt = new DataTransfer();
    Array.from(images).forEach((file, i) => {
      if (i !== idx) dt.items.add(file);
    });
    setImages(dt.files.length ? dt.files : null);
  };

  // Remover planta
  const handleRemovePlan = () => setPlanImage(null);

  // Utilitário para formatar tamanho
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 col-span-2">
      <h2 className="text-xl font-semibold border-b pb-2">Imagens do Imóvel</h2>
      {/* Upload de fotos do imóvel */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block font-medium">Fotos do imóvel</label>
          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{images ? images.length : 0}/10</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer text-center shadow-sm bg-white ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
          onClick={() => imageInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-12 h-12 text-blue-500 mb-3 transition-transform duration-200" />
          <span className="text-base text-gray-700 font-medium mb-1">Arraste e solte ou clique para selecionar imagens</span>
          <span className="text-xs text-gray-400">Máx. 10 imagens, até 5MB cada</span>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImagesChange}
          />
        </div>
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-5">
            {Array.from(images).map((file, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition-all bg-gray-50">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-full h-28 object-cover"
                />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-50"
                    onClick={e => { e.stopPropagation(); handleRemoveImage(idx); }}
                    title="Remover imagem"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1 text-xs text-white flex flex-col items-start">
                  <span className="truncate w-full" title={file.name}>{file.name}</span>
                  <span className="opacity-80">{formatSize(file.size)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Upload de planta baixa */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block font-medium">Planta baixa <span className="text-xs text-gray-400">(opcional)</span></label>
          {planImage && (
            <button
              type="button"
              className="text-xs text-red-500 hover:underline"
              onClick={handleRemovePlan}
            >Remover</button>
          )}
        </div>
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer text-center shadow-sm bg-white ${planImage ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
          onClick={() => planInputRef.current?.click()}
        >
          <FileImage className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-base text-gray-700 font-medium mb-1">Arraste ou clique para selecionar a planta baixa</span>
          <span className="text-xs text-gray-400">Até 5MB</span>
          <input
            ref={planInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePlanImageChange}
          />
        </div>
        {planImage && (
          <div className="relative mt-3 inline-block rounded-lg overflow-hidden shadow bg-gray-50">
            <img
              src={URL.createObjectURL(planImage)}
              alt="preview-plan"
              className="w-40 h-40 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1 text-xs text-white">
              <span className="truncate w-full" title={planImage.name}>{planImage.name}</span>
              <span className="opacity-80">{formatSize(planImage.size)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImagesForm; 