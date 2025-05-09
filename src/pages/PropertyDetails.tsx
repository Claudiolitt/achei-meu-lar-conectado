
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockProperties } from '../data/mockProperties';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, Share, MapPin, Calendar, Home, Ruler, Bed, Bath, Car, Info, User } from 'lucide-react';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the property with the matching ID
  const property = mockProperties.find(p => p.id === id);
  
  // If property not found, show error message
  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy-800 mb-4">Imóvel não encontrado</h1>
            <p className="text-navy-600 mb-8">
              O imóvel que você está procurando não existe ou foi removido.
            </p>
            <Button>Voltar para Página Inicial</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Image gallery */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-2/3 lg:basis-1/2">
                    <div className="p-1">
                      <img 
                        src={image} 
                        alt={`${property.title} - Imagem ${index + 1}`} 
                        className="w-full h-[400px] object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        
        {/* Property details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-navy-800">{property.title}</h1>
                    <p className="text-navy-600 flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" /> 
                      {property.address.street}, {property.address.neighborhood} - {property.address.city}, {property.address.state}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full" 
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-navy-500 mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Publicado em {formatDate(property.createdAt)}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-navy-50 p-4 rounded-lg text-center">
                    <Bed className="h-5 w-5 mx-auto mb-2 text-navy-700" />
                    <p className="text-sm text-navy-600">Dormitórios</p>
                    <p className="text-lg font-semibold text-navy-800">{property.features.bedrooms}</p>
                  </div>
                  <div className="bg-navy-50 p-4 rounded-lg text-center">
                    <Bath className="h-5 w-5 mx-auto mb-2 text-navy-700" />
                    <p className="text-sm text-navy-600">Banheiros</p>
                    <p className="text-lg font-semibold text-navy-800">{property.features.bathrooms}</p>
                  </div>
                  <div className="bg-navy-50 p-4 rounded-lg text-center">
                    <Car className="h-5 w-5 mx-auto mb-2 text-navy-700" />
                    <p className="text-sm text-navy-600">Vagas</p>
                    <p className="text-lg font-semibold text-navy-800">{property.features.parkingSpots}</p>
                  </div>
                  <div className="bg-navy-50 p-4 rounded-lg text-center">
                    <Ruler className="h-5 w-5 mx-auto mb-2 text-navy-700" />
                    <p className="text-sm text-navy-600">Área</p>
                    <p className="text-lg font-semibold text-navy-800">{property.features.area}m²</p>
                  </div>
                </div>
                
                <Tabs defaultValue="description">
                  <TabsList className="mb-4 bg-navy-50">
                    <TabsTrigger value="description">Descrição</TabsTrigger>
                    <TabsTrigger value="features">Características</TabsTrigger>
                    <TabsTrigger value="location">Localização</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="text-navy-700">
                    <p>{property.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600" />
                        <span className="text-navy-700">Tipo: </span>
                        <span className="ml-2 font-medium">{property.type === 'apartment' ? 'Apartamento' : 
                          property.type === 'house' ? 'Casa' :
                          property.type === 'commercial' ? 'Comercial' :
                          'Terreno'}</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600" />
                        <span className="text-navy-700">Ano de construção: </span>
                        <span className="ml-2 font-medium">{property.features.buildYear || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600" />
                        <span className="text-navy-700">Mobiliado: </span>
                        <span className="ml-2 font-medium">{property.features.furnished ? 'Sim' : 'Não'}</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location">
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-navy-600">Mapa não disponível no momento</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-20">
                <div className="mb-4">
                  <p className="text-sm text-navy-600">{property.priceType === 'sale' ? 'Preço de venda' : 'Valor do aluguel'}</p>
                  <p className="text-3xl font-bold text-navy-800">
                    {formatCurrency(property.price)}
                    {property.priceType === 'rent' && <span className="text-base font-normal">/mês</span>}
                  </p>
                </div>
                
                <Button className="w-full mb-3 bg-navy-700 hover:bg-navy-600">
                  Entrar em contato
                </Button>
                
                <Button variant="outline" className="w-full">
                  Ver telefone
                </Button>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-navy-800 mb-2">Anunciante</h3>
                  <div className="flex items-center">
                    <div className="bg-navy-100 w-12 h-12 rounded-full flex items-center justify-center text-navy-700 mr-3">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-800">Corretor Exemplo</p>
                      <p className="text-sm text-navy-600">Membro desde Jun 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
