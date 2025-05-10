
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const RealEstateNews: React.FC = () => {
  // Mock news data
  const news = [
    {
      id: 1,
      title: "Mercado imobiliário registra aumento de 15% nas vendas no primeiro trimestre",
      excerpt: "Setor apresenta recuperação após período de desaceleração econômica, com destaque para imóveis residenciais.",
      date: "10/05/2025",
      category: "Mercado",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Nova lei facilita financiamento imobiliário para jovens profissionais",
      excerpt: "Medida visa aumentar o acesso à casa própria para profissionais em início de carreira com condições especiais.",
      date: "08/05/2025",
      category: "Legislação",
      image: "https://images.unsplash.com/photo-1600047509807-f8261a3f7538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Construções sustentáveis ganham destaque entre compradores",
      excerpt: "Imóveis com certificações ambientais e eficiência energética valorizam até 25% acima do mercado tradicional.",
      date: "05/05/2025",
      category: "Tendências",
      image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Bairros emergentes se tornam nova fronteira para investidores",
      excerpt: "Regiões em desenvolvimento atraem investimentos por oferecerem melhor custo-benefício e potencial de valorização.",
      date: "02/05/2025",
      category: "Investimentos",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notícias do Mercado Imobiliário</h1>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">Mercado</Badge>
            <Badge variant="outline" className="text-xs">Legislação</Badge>
            <Badge variant="outline" className="text-xs">Tendências</Badge>
            <Badge variant="outline" className="text-xs">Investimentos</Badge>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{item.date}</span>
                  <Badge>{item.category}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
              </CardContent>
              <CardFooter>
                <a href="#" className="text-sm text-primary hover:underline">Ler mais</a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealEstateNews;
