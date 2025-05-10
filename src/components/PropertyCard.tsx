import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import { Heart, Bed, Car, Ruler, Bath } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
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
      className="block rounded-xl overflow-hidden bg-white dark:bg-[#18223a] border border-navy-100 dark:border-[#18223a] shadow-[4px_8px_24px_0px_rgba(20,23,40,0.18)] hover:shadow-xl transition-all duration-200"
    >
      <div className="relative">
        <img 
          src={property.images[0] || getIllustrativeImage(property)} 
          alt={property.title} 
          className="w-full h-56 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-[#232c43] backdrop-blur-sm hover:bg-white dark:hover:bg-[#2d3a5a] transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-white'}`} 
          />
        </button>
        
        {property.featured && (
          <div className="absolute top-3 left-3 py-1 px-3 bg-boho-400 dark:bg-boho-500 text-white text-xs font-bold rounded-full shadow-sm">
            Destaque
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 py-1 px-3 bg-navy-800/90 dark:bg-[#232c43] backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm">
          {property.priceType === 'sale' ? 'Venda' : 'Aluguel'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-navy-800 dark:text-white line-clamp-1">{property.title}</h3>
        </div>
        
        <div className="mt-2">
          <span className="text-xl font-bold text-navy-700 dark:text-white">
            {formatCurrency(property.price)}
            {property.priceType === 'rent' && <span className="text-sm font-normal text-navy-400 dark:text-white">/mês</span>}
          </span>
          
          {property.priceType === 'rent' && property.features.condominiumFee && (
            <div className="mt-1 text-sm text-navy-500 dark:text-white">
              Condomínio: {formatCurrency(property.features.condominiumFee)}/mês
            </div>
          )}
          
          {property.features.iptu && (
            <div className="mt-1 text-sm text-navy-500 dark:text-white">
              IPTU: {formatCurrency(property.features.iptu)}/ano
            </div>
          )}
        </div>
        
        <div className="mt-2 text-navy-500 dark:text-white text-sm">
          {property.address.neighborhood}, {property.address.city} - {property.address.state}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-navy-600 dark:text-white">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1 dark:text-white" />
            <span className="text-sm">{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1 dark:text-white" />
            <span className="text-sm">{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-1 dark:text-white" />
            <span className="text-sm">{property.features.parkingSpots}</span>
          </div>
          <div className="flex items-center">
            <Ruler className="w-4 h-4 mr-1 dark:text-white" />
            <span className="text-sm">{property.features.area}m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
