
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import { Heart, Bed, Car, Ruler } from 'lucide-react';
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

  return (
    <Link 
      to={`/property/${property.id}`}
      className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden property-card-shadow property-card-hover"
    >
      <div className="relative w-full md:w-1/3">
        <img 
          src={property.images[0]} 
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
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center text-navy-600">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.features.bedrooms} quartos</span>
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
