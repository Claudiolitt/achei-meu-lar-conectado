
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, Star } from "lucide-react";

interface HighlightOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
}

const HIGHLIGHT_OPTIONS: HighlightOption[] = [
  {
    id: 'standard',
    name: 'Destaque Padrão',
    description: 'Maior visibilidade na página de resultados',
    price: 29.90,
    duration: 7,
    features: [
      'Selo de destaque',
      'Posicionamento acima dos anúncios normais',
      'Duração de 7 dias'
    ]
  },
  {
    id: 'premium',
    name: 'Destaque Premium',
    description: 'Máxima visibilidade para seu imóvel',
    price: 49.90,
    duration: 15,
    features: [
      'Selo de destaque premium',
      'Aparece nos resultados de busca da página inicial',
      'Posicionamento prioritário na lista',
      'Duração de 15 dias'
    ]
  },
  {
    id: 'spotlight',
    name: 'Super Destaque',
    description: 'Exposição máxima em toda a plataforma',
    price: 99.90,
    duration: 30,
    features: [
      'Aparece em banner rotativo na página inicial',
      'Selo exclusivo de super destaque',
      'Posicionamento no topo em todas as buscas',
      'Duração de 30 dias'
    ]
  }
];

interface ListingHighlightOptionsProps {
  propertyId?: string;
  onSelect?: (option: HighlightOption) => void;
}

const ListingHighlightOptions: React.FC<ListingHighlightOptionsProps> = ({
  propertyId,
  onSelect
}) => {
  const handleSelect = (option: HighlightOption) => {
    if (onSelect) {
      onSelect(option);
    }
    // Default implementation if no onSelect is provided
    console.log('Selected highlight option:', option);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Destaque seu anúncio</h2>
        <p className="text-muted-foreground">
          Aumente a visibilidade do seu imóvel e receba mais contatos de pessoas interessadas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HIGHLIGHT_OPTIONS.map((option) => (
          <Card key={option.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                {option.id === 'premium' && (
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                )}
                {option.id === 'spotlight' && (
                  <ArrowUp className="h-5 w-5 text-primary mr-2" />
                )}
                {option.name}
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-2xl font-bold">
                  R$ {option.price.toFixed(2)}
                </span>
              </div>
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-2 h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={option.id === 'premium' ? "default" : "outline"}
                onClick={() => handleSelect(option)}
              >
                Selecionar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          <strong>Nota:</strong> O destaque será aplicado imediatamente após o pagamento ser confirmado e 
          terá duração conforme o plano selecionado. Os anúncios destacados recebem, em média, 
          3x mais visualizações que os anúncios normais.
        </p>
      </div>
    </div>
  );
};

export default ListingHighlightOptions;
