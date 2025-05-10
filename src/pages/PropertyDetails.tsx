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
import PropertyContactForm from '../components/PropertyContactForm';

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
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#0e1624]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Image gallery */}
        <section className="bg-white dark:bg-[#18223a]">
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
              <div className="bg-white dark:bg-[#18223a] rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-navy-800 dark:text-white">{property.title}</h1>
                    <p className="text-navy-600 dark:text-white flex items-center mt-2">
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
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'dark:text-white'}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share className="h-5 w-5 dark:text-white" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-navy-500 dark:text-white mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Publicado em {formatDate(property.createdAt)}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-navy-50 dark:bg-[#232c43] p-4 rounded-lg text-center">
                    <Bed className="h-5 w-5 mx-auto mb-2 text-navy-700 dark:text-white" />
                    <p className="text-sm text-navy-600 dark:text-white">Dormitórios</p>
                    <p className="text-lg font-semibold text-navy-800 dark:text-white">{property.features.bedrooms}</p>
                  </div>
                  <div className="bg-navy-50 dark:bg-[#232c43] p-4 rounded-lg text-center">
                    <Bath className="h-5 w-5 mx-auto mb-2 text-navy-700 dark:text-white" />
                    <p className="text-sm text-navy-600 dark:text-white">Banheiros</p>
                    <p className="text-lg font-semibold text-navy-800 dark:text-white">{property.features.bathrooms}</p>
                  </div>
                  <div className="bg-navy-50 dark:bg-[#232c43] p-4 rounded-lg text-center">
                    <Car className="h-5 w-5 mx-auto mb-2 text-navy-700 dark:text-white" />
                    <p className="text-sm text-navy-600 dark:text-white">Vagas</p>
                    <p className="text-lg font-semibold text-navy-800 dark:text-white">{property.features.parkingSpots}</p>
                  </div>
                  <div className="bg-navy-50 dark:bg-[#232c43] p-4 rounded-lg text-center">
                    <Ruler className="h-5 w-5 mx-auto mb-2 text-navy-700 dark:text-white" />
                    <p className="text-sm text-navy-600 dark:text-white">Área</p>
                    <p className="text-lg font-semibold text-navy-800 dark:text-white">{property.features.area}m²</p>
                  </div>
                </div>
                
                <Tabs defaultValue="description">
                  <TabsList className="mb-4 bg-navy-50 dark:bg-[#232c43]">
                    <TabsTrigger value="description" className="dark:text-white">Descrição</TabsTrigger>
                    <TabsTrigger value="features" className="dark:text-white">Características</TabsTrigger>
                    <TabsTrigger value="location" className="dark:text-white">Localização</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="text-navy-700 dark:text-white">
                    <p>{property.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600 dark:text-white" />
                        <span className="text-navy-700 dark:text-white">Tipo: </span>
                        <span className="ml-2 font-medium text-navy-800 dark:text-white">{property.type === 'apartment' ? 'Apartamento' : 
                          property.type === 'house' ? 'Casa' :
                          property.type === 'commercial' ? 'Comercial' :
                          'Terreno'}</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600 dark:text-white" />
                        <span className="text-navy-700 dark:text-white">Ano de construção: </span>
                        <span className="ml-2 font-medium text-navy-800 dark:text-white">{property.features.buildYear || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-navy-600 dark:text-white" />
                        <span className="text-navy-700 dark:text-white">Mobiliado: </span>
                        <span className="ml-2 font-medium text-navy-800 dark:text-white">{property.features.furnished ? 'Sim' : 'Não'}</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location">
                    <div className="bg-gray-100 dark:bg-[#232c43] h-64 rounded-lg flex items-center justify-center">
                      <p className="text-navy-600 dark:text-white">Mapa não disponível no momento</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white dark:bg-[#18223a] rounded-xl shadow-sm p-6 mb-6 sticky top-20">
                <div className="mb-4">
                  <p className="text-sm text-navy-600 dark:text-white">{property.priceType === 'sale' ? 'Preço de venda' : 'Valor do aluguel'}</p>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-navy-800 dark:text-white">
                      {formatCurrency(property.price)}
                      {property.priceType === 'rent' && <span className="text-sm font-normal text-navy-400 dark:text-white">/mês</span>}
                    </span>
                    
                    {property.priceType === 'rent' && property.features.condominiumFee && (
                      <div className="mt-2 text-navy-600 dark:text-white">
                        <span className="font-medium">Condomínio: </span>
                        <span>{formatCurrency(property.features.condominiumFee)}/mês</span>
                      </div>
                    )}
                    
                    {property.features.iptu && (
                      <div className="mt-1 text-navy-600 dark:text-white">
                        <span className="font-medium">IPTU: </span>
                        <span>{formatCurrency(property.features.iptu)}/ano</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact form */}
                <PropertyContactForm 
                  propertyId={property.id} 
                  propertyTitle={property.title}
                />
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
