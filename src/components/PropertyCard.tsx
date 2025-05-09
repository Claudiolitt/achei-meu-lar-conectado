
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import { Heart, Bed, Car, Ruler } from 'lucide-react';
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

  return (
    <Link 
      to={`/property/${property.id}`}
      className="block rounded-xl overflow-hidden bg-white property-card-shadow property-card-hover"
    >
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-56 object-cover"
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
        
        <div className="absolute bottom-3 left-3 py-1 px-3 bg-navy-800/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
          {property.priceType === 'sale' ? 'Venda' : 'Aluguel'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-navy-800 line-clamp-1">{property.title}</h3>
        </div>
        
        <div className="mt-2">
          <span className="text-xl font-bold text-navy-700">
            {formatCurrency(property.price)}
            {property.priceType === 'rent' && <span className="text-sm font-normal text-navy-400">/mês</span>}
          </span>
        </div>
        
        <div className="mt-2 text-navy-500 text-sm">
          {property.address.neighborhood}, {property.address.city} - {property.address.state}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-navy-600">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.features.parkingSpots}</span>
          </div>
          <div className="flex items-center">
            <Ruler className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.features.area}m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
