
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../data/mockProperties';
import { Button } from '@/components/ui/button';
import { Heart, Trash } from 'lucide-react';

const Favorites: React.FC = () => {
  // In a real app, this would come from a user's saved favorites
  // For now, let's use a subset of our mock properties
  const [favorites, setFavorites] = useState(mockProperties.slice(0, 4));
  
  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <h1 className="text-2xl font-bold text-navy-800">Meus Favoritos</h1>
            </div>
            
            {favorites.length > 0 && (
              <Button variant="outline" className="flex items-center text-navy-700">
                <Trash className="h-4 w-4 mr-2" />
                Limpar todos
              </Button>
            )}
          </div>
          
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map(property => (
                <div key={property.id} className="relative">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="absolute right-3 top-3 z-10 bg-white rounded-full"
                    onClick={() => removeFavorite(property.id)}
                  >
                    <Trash className="h-4 w-4 text-navy-600" />
                  </Button>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-navy-300" />
              </div>
              <h2 className="text-xl font-semibold text-navy-800 mb-2">Você ainda não tem favoritos</h2>
              <p className="text-navy-600 mb-6">
                Salve imóveis como favoritos para acompanhá-los mais facilmente
              </p>
              <Button>Explorar imóveis</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
