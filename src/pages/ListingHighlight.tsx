
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingHighlightOptions from '../components/subscription/ListingHighlightOptions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ListingHighlight: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null);
  
  // Get property data from location state
  const propertyData = location.state?.propertyData;
  
  if (!propertyData) {
    // If no property data is available, redirect to property registration
    navigate('/property-registration');
    return null;
  }

  const handleProceed = () => {
    if (!selectedHighlight) {
      return;
    }
    
    // Navigate to payment page with property and highlight data
    navigate('/payment/highlight', { 
      state: {
        propertyData,
        highlightOption: selectedHighlight,
        images: location.state?.images,
        planImage: location.state?.planImage
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para detalhes do imóvel
        </Button>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Destaque seu anúncio</h1>
            <p className="text-muted-foreground mt-2">
              Escolha uma opção de destaque para aumentar a visibilidade do seu imóvel
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 border-b pb-4">
              <h2 className="font-medium text-lg">Imóvel a ser anunciado</h2>
              <p className="text-lg font-semibold">{propertyData.title}</p>
              <p className="text-muted-foreground">
                {propertyData.address.street}, {propertyData.address.neighborhood} - {propertyData.address.city}, {propertyData.address.state}
              </p>
              <p className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {propertyData.priceType === 'sale' ? 'Venda' : 'Aluguel'}
                </span>
                <span className="ml-2 font-medium">
                  R$ {propertyData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  {propertyData.priceType === 'rent' && '/mês'}
                </span>
              </p>
            </div>
            
            <ListingHighlightOptions 
              onSelect={(option) => setSelectedHighlight(option)}
            />
            
            <div className="mt-8 flex justify-end">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={() => navigate('/payment', { 
                  state: { 
                    propertyData,
                    images: location.state?.images,
                    planImage: location.state?.planImage,
                    skipHighlight: true
                  }
                })}
              >
                Pular e publicar sem destaque
              </Button>
              <Button 
                onClick={handleProceed}
                disabled={!selectedHighlight}
              >
                Prosseguir para pagamento
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingHighlight;
