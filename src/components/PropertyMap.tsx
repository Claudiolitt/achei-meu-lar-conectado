
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '../types/property';

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // Focus the map on the properties
    const getBounds = () => {
      // If no properties or they don't have coordinates, default to Brazil bounds
      if (properties.length === 0) {
        return [[-73.9872354, -33.7683777], [-34.7299886, 5.24448639]]; // Brazil bounds
      }
      
      // Use mock coordinates for properties since we don't have real lat/lng in our data
      const mockCoordinates = [
        [-43.182365, -22.906847], // Rio de Janeiro
        [-43.192365, -22.916847],
        [-43.202365, -22.926847],
        [-43.212365, -22.936847],
        [-43.222365, -22.946847],
        [-43.232365, -22.956847],
      ];
      
      // Assign mock coordinates to properties sequentially
      const coordinates = properties.map((_, index) => {
        const position = index % mockCoordinates.length;
        return mockCoordinates[position];
      });
      
      // Calculate bounds
      const lngs = coordinates.map(c => c[0]);
      const lats = coordinates.map(c => c[1]);
      
      return [
        [Math.min(...lngs) - 0.1, Math.min(...lats) - 0.1],
        [Math.max(...lngs) + 0.1, Math.max(...lats) + 0.1]
      ];
    };

    const initializeMap = (token: string) => {
      if (!mapContainer.current || map.current) return;

      // Initialize map
      mapboxgl.accessToken = token;
      
      const bounds = getBounds();
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        bounds: bounds as mapboxgl.LngLatBoundsLike,
        fitBoundsOptions: { padding: 50 }
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add properties to map
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add properties as markers
        properties.forEach((property, index) => {
          const mockCoordinates = [
            [-43.182365, -22.906847], // Rio de Janeiro
            [-43.192365, -22.916847],
            [-43.202365, -22.926847],
            [-43.212365, -22.936847],
            [-43.222365, -22.946847],
            [-43.232365, -22.956847],
          ];
          
          const position = index % mockCoordinates.length;
          const [lng, lat] = mockCoordinates[position];
          
          // Create a marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'property-marker';
          markerEl.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-navy-700 cursor-pointer relative">
              <div class="text-navy-700 font-bold text-xs">
                ${property.priceType === 'sale' ? 'Venda' : 'Aluguel'}
              </div>
            </div>
          `;
          
          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-navy-800">${property.title}</h3>
                <p class="text-navy-600">${property.address.neighborhood}</p>
              </div>
            `);
          
          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map.current);
        });
      });
    };

    // If token exists, initialize the map
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [properties, mapboxToken]);

  // Handle token input
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapboxToken', token);
    }
  };

  // Check if token exists in localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  if (!mapboxToken) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-navy-800 mb-4">Mapbox Token Necessário</h3>
        <p className="text-navy-600 mb-6 text-center">
          Para visualizar os imóveis no mapa, por favor insira seu token público do Mapbox.
          <br />
          Você pode obter um token gratuito em <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
          <div className="flex gap-2">
            <input 
              type="text" 
              name="mapboxToken"
              placeholder="Cole seu token público do Mapbox aqui" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <button 
              type="submit"
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-md"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default PropertyMap;
