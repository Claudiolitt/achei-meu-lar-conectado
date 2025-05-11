import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../types/property';
import L from 'leaflet';

// Ícone customizado para os marcadores
const propertyIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  properties: Property[];
}

const mockCoordinates = [
  [-22.906847, -43.182365], // Rio de Janeiro
  [-22.916847, -43.192365],
  [-22.926847, -43.202365],
  [-22.936847, -43.212365],
  [-22.946847, -43.222365],
  [-22.956847, -43.232365],
];

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  // Se não houver propriedades, centraliza no Brasil
  const defaultPosition = [-14.235004, -51.92528];
  const coordinates = properties.length
    ? properties.map((_, idx) => mockCoordinates[idx % mockCoordinates.length])
    : [defaultPosition];

  // Calcula o centro do mapa
  const mapCenter = properties.length
    ? [
        coordinates.reduce((sum, c) => sum + c[0], 0) / coordinates.length,
        coordinates.reduce((sum, c) => sum + c[1], 0) / coordinates.length,
      ]
    : defaultPosition;

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={mapCenter as [number, number]}
        zoom={properties.length ? 12 : 4}
        scrollWheelZoom={true}
        className="absolute inset-0 w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property, idx) => {
          const [lat, lng] = coordinates[idx];
          return (
            <Marker key={property.id} position={[lat, lng]} icon={propertyIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-navy-800">{property.title}</h3>
                  <p className="text-navy-600">{property.address.neighborhood}</p>
                  <span className="text-xs font-semibold text-navy-700">
                    {property.priceType === 'sale' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
