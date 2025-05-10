import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import { Heart, Bed, Car, Ruler, Bath } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface PropertyListCardProps {
  property: Property;
}

const PropertyListCard: React.FC<PropertyListCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getIllustrativeImage = (property: Property) => {
    const title = property.title.toLowerCase();
    let keyword = 'real estate';
    if (property.type === 'apartment' || title.includes('apartamento')) keyword = 'apartamento';
    else if (property.type === 'house' || title.includes('casa')) keyword = 'casa';
    else if (property.type === 'commercial' || title.includes('comercial')) keyword = 'comercial';
    else if (property.type === 'land' || title.includes('terreno')) keyword = 'terreno';
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(keyword)}`;
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden property-card-shadow property-card-hover shadow-[4px_8px_24px_0px_rgba(20,23,40,0.18)] hover:shadow-xl transition-all duration-200"
    >
      <div className="relative w-full md:w-1/3">
        <img 
          src={property.images[0] || getIllustrativeImage(property)} 
          alt={property.title} 
          className="w-full h-56 md:h-full object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        
        {property.featured && (
          <div className="absolute top-3 left-3 py-1 px-3 bg-boho-400 text-white text-xs font-bold rounded-full">
            Destaque
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-navy-800">{property.title}</h3>
            <span className="text-sm font-bold bg-navy-50 text-navy-700 px-2 py-1 rounded">
              {property.priceType === 'sale' ? 'Venda' : 'Aluguel'}
            </span>
          </div>
          
          <p className="text-navy-500 text-sm mb-4">
            {property.address.neighborhood}, {property.address.city} - {property.address.state}
          </p>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="flex items-center text-navy-600">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.features.bedrooms} quartos</span>
            </div>
            <div className="flex items-center text-navy-600">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.features.bathrooms} banheiros</span>
            </div>
            <div className="flex items-center text-navy-600">
              <Car className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.features.parkingSpots} vagas</span>
            </div>
            <div className="flex items-center text-navy-600">
              <Ruler className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.features.area}m²</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xl font-bold text-navy-700">
              {formatCurrency(property.price)}
              {property.priceType === 'rent' && <span className="text-sm font-normal text-navy-400">/mês</span>}
            </span>
            
            {property.priceType === 'rent' && property.features.condominiumFee && (
              <div className="mt-1 text-sm text-navy-500">
                Condomínio: {formatCurrency(property.features.condominiumFee)}/mês
              </div>
            )}
            
            {property.features.iptu && (
              <div className="mt-1 text-sm text-navy-500">
                IPTU: {formatCurrency(property.features.iptu)}/ano
              </div>
            )}
          </div>
          <div className="text-navy-500 text-sm">
            Ano {property.features.buildYear || 'N/A'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyListCard;
