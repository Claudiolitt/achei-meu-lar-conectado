import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import PropertyListCard from '../components/PropertyListCard';
import PropertyMap from '../components/PropertyMap';
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
import { Property } from '../types/property';

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const propertiesPerPage = 9;
  const location = useLocation();
  
  // Filter properties based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let filtered = [...mockProperties];
    
    // Search text
    const searchQuery = params.get('search')?.toLowerCase();
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery) ||
        property.description.toLowerCase().includes(searchQuery) ||
        property.address.street.toLowerCase().includes(searchQuery) ||
        property.address.neighborhood.toLowerCase().includes(searchQuery) ||
        property.address.city.toLowerCase().includes(searchQuery)
      );
    }
    
    // Property type - support for legacy 'type' parameter (single selection)
    const propertyType = params.get('type');
    if (propertyType && propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === propertyType);
    }
    
    // Transaction type (sale/rent)
    const transactionType = params.get('transaction');
    if (transactionType && transactionType !== 'all') {
      filtered = filtered.filter(property => property.priceType === transactionType);
    }
    
    // Property types (multiple selection)
    const propertyTypes = params.get('propertyTypes')?.split(',');
    if (propertyTypes && propertyTypes.length > 0 && propertyTypes[0] !== '') {
      filtered = filtered.filter(property => propertyTypes.includes(property.type));
    }
    
    // Price range
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const minTotalPrice = params.get('minTotalPrice');
    const maxTotalPrice = params.get('maxTotalPrice');
    
    if (transactionType === 'rent' && (minTotalPrice || maxTotalPrice)) {
      // Filter by total price (rent + condominium + IPTU) for rental properties
      filtered = filtered.filter(property => {
        if (property.priceType !== 'rent') return true;
        
        const totalPrice = property.price + 
          (property.features.condominiumFee || 0) + 
          ((property.features.iptu || 0) / 12); // Convert annual IPTU to monthly
        
        if (minTotalPrice && totalPrice < Number(minTotalPrice)) return false;
        if (maxTotalPrice && totalPrice > Number(maxTotalPrice)) return false;
        return true;
      });
    } else {
      // Regular price filter
      if (minPrice) {
        filtered = filtered.filter(property => property.price >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter(property => property.price <= Number(maxPrice));
      }
    }
    
    // Area range
    const minArea = params.get('minArea');
    if (minArea) {
      filtered = filtered.filter(property => property.features.area >= Number(minArea));
    }
    
    const maxArea = params.get('maxArea');
    if (maxArea) {
      filtered = filtered.filter(property => property.features.area <= Number(maxArea));
    }
    
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [location.search]);
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  
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
        <section className="bg-white dark:bg-[#18223a] py-6">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-3xl">
              <SearchFilters />
            </div>
          </div>
        </section>
        
        {/* Property Listing */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-navy-800">
              {filteredProperties.length === 0 
                ? "Nenhum imóvel encontrado" 
                : `${filteredProperties.length} Imóveis Encontrados`}
            </h1>
            
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
            <>
              {filteredProperties.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-navy-600">Nenhum imóvel corresponde aos critérios de busca.</p>
                  <Button variant="outline" className="mt-4">Limpar filtros</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Properties List View */}
          {viewMode === 'list' && (
            <>
              {filteredProperties.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-navy-600">Nenhum imóvel corresponde aos critérios de busca.</p>
                  <Button variant="outline" className="mt-4">Limpar filtros</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentProperties.map(property => (
                    <PropertyListCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Properties Map View */}
          {viewMode === 'map' && (
            <PropertyMap properties={filteredProperties} />
          )}
          
          {/* Pagination (only show for grid and list views) */}
          {viewMode !== 'map' && filteredProperties.length > 0 && (
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
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
