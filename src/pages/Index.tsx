
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { mockProperties } from '../data/mockProperties';
import { Button } from '@/components/ui/button';
import { Search, Home, User } from 'lucide-react';

const Index: React.FC = () => {
  // Filter featured properties for the showcase
  const featuredProperties = mockProperties.filter(property => property.featured);
  
  // Get recent properties sorted by date
  const recentProperties = [...mockProperties].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="container mx-auto px-4 -mt-8 relative z-20">
          <SearchFilters />
        </section>
        
        {/* Featured Properties */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-navy-800">Imóveis em Destaque</h2>
            <Button variant="outline" className="text-navy-700">
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
        
        {/* Recent Properties */}
        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-navy-800">Imóveis Recentes</h2>
            <Button variant="outline" className="text-navy-700">
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
        
        {/* App Features */}
        <section className="bg-navy-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">Por que escolher Achei meu Lar?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-navy-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Busca Inteligente</h3>
                <p className="text-navy-100">
                  Encontre exatamente o que procura com nossos filtros avançados e busca inteligente.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-navy-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Anúncios Verificados</h3>
                <p className="text-navy-100">
                  Todos os anúncios são verificados pela nossa equipe para garantir a qualidade.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-navy-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Contato Direto</h3>
                <p className="text-navy-100">
                  Entre em contato diretamente com os anunciantes sem intermediários.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
