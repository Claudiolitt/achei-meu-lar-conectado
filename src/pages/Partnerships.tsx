
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Check, Building, TruckIcon, Paintbrush, CreditCard } from 'lucide-react';

const Partnerships: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Solicitação enviada com sucesso!', {
      description: 'Nossa equipe entrará em contato em breve.'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Parcerias para impulsionar seu negócio
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Conecte sua empresa com milhares de pessoas interessadas em imóveis e expanda seu alcance.
              </p>
              <Button size="lg" variant="secondary">
                Saiba mais
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership types */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Tipos de Parcerias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Imobiliárias</CardTitle>
                <CardDescription>
                  Soluções para agências imobiliárias de todos os portes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Integração com seu sistema de gestão</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Destaque para sua marca</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Importação automática do portfólio</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <TruckIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Mudanças</CardTitle>
                <CardDescription>
                  Soluções para empresas de mudança e transporte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Indicações de clientes em processo de mudança</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Anúncios segmentados por região</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Cupons exclusivos para nossos usuários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Paintbrush className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Decoração</CardTitle>
                <CardDescription>
                  Soluções para arquitetos e decoradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Destaque para portfólio de projetos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Contato com compradores de imóveis novos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Participação em conteúdos especializados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Financiamento</CardTitle>
                <CardDescription>
                  Soluções para bancos e instituições financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Acesso a potenciais compradores qualificados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Integração com simuladores de financiamento</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Divulgação de condições especiais</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefícios para parceiros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Público segmentado</h3>
                <p className="text-muted-foreground">
                  Tenha acesso a um público altamente segmentado e interessado em serviços relacionados a imóveis.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Integração personalizada</h3>
                <p className="text-muted-foreground">
                  Desenvolvemos soluções sob medida para as necessidades específicas do seu negócio.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Comissão justa</h3>
                <p className="text-muted-foreground">
                  Modelo de comissionamento transparente baseado em resultados, com pagamento apenas por leads qualificados.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact form */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Torne-se um parceiro</h2>
            <p className="text-center text-muted-foreground mb-8">
              Preencha o formulário abaixo e nossa equipe entrará em contato em até 48 horas.
            </p>
            
            <Card>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="partnership-type">Tipo de parceria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de parceria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-estate">Imobiliária</SelectItem>
                        <SelectItem value="moving">Mudança</SelectItem>
                        <SelectItem value="decoration">Decoração</SelectItem>
                        <SelectItem value="financing">Financiamento</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Descreva como podemos trabalhar juntos e seus objetivos com essa parceria"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Enviar solicitação</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partnerships;
