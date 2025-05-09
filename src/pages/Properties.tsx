
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import PropertyListCard from '../components/PropertyListCard';
import { mockProperties } from '../data/mockProperties';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Grid2X2, List, Map } from 'lucide-react';

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = mockProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(mockProperties.length / propertiesPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Search Filters */}
        <section className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <SearchFilters />
          </div>
        </section>
        
        {/* Property Listing */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-navy-800">Imóveis Encontrados</h1>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-navy-700' : ''}
              >
                <Grid2X2 className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-navy-700' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('map')}
                className={viewMode === 'map' ? 'bg-navy-700' : ''}
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Properties Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* Properties List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {currentProperties.map(property => (
                <PropertyListCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* Properties Map View */}
          {viewMode === 'map' && (
            <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
              <p className="text-navy-600">Visualização do mapa será implementada em breve.</p>
            </div>
          )}
          
          {/* Pagination */}
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                  }} />
                </PaginationItem>
              )}
              
              {pageNumbers.map(number => (
                <PaginationItem key={number}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === number}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(number);
                    }}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  }} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
