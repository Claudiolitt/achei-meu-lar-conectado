import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <Separator className="mb-6" />
        
        <div className="prose max-w-none">
          <p className="lead">
            Esta Política de Privacidade descreve como o Imóveis Conecta coleta, usa e compartilha suas informações pessoais.
          </p>
          
          <h2>1. Informações Coletadas</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, como:
          </p>
          <ul>
            <li>Dados de cadastro (nome, e-mail, telefone, CPF)</li>
            <li>Preferências de busca de imóveis</li>
            <li>Mensagens enviadas pela plataforma</li>
            <li>Informações de imóveis anunciados</li>
          </ul>
          
          <h2>2. Uso das Informações</h2>
          <p>
            Utilizamos suas informações para:
          </p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar transações e gerenciar sua conta</li>
            <li>Enviar comunicações sobre a plataforma</li>
            <li>Personalizar sua experiência na plataforma</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          
          <h2>3. Compartilhamento de Informações</h2>
          <p>
            Podemos compartilhar suas informações com:
          </p>
          <ul>
            <li>Outros usuários, conforme necessário para a funcionalidade da plataforma</li>
            <li>Parceiros de serviço que nos auxiliam na operação da plataforma</li>
            <li>Autoridades governamentais, quando exigido por lei</li>
          </ul>
          
          <h2>4. Armazenamento e Segurança</h2>
          <p>
            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado,
            alteração, divulgação ou destruição.
          </p>
          
          <h2>5. Seus Direitos</h2>
          <p>
            Você tem o direito de:
          </p>
          <ul>
            <li>Acessar, corrigir ou excluir suas informações pessoais</li>
            <li>Restringir ou se opor a certos usos de suas informações</li>
            <li>Solicitar a portabilidade de suas informações</li>
            <li>Retirar seu consentimento a qualquer momento</li>
          </ul>
          
          <h2>6. Cookies e Tecnologias Semelhantes</h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para coletar informações sobre sua navegação,
            melhorar sua experiência e personalizar o conteúdo.
          </p>
          
          <h2>7. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política periodicamente. Notificaremos sobre alterações significativas
            através de aviso na plataforma ou por e-mail.
          </p>
          
          <h2>8. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política, entre em contato conosco pelo e-mail: privacidade@acheimeular.com
          </p>
          
          <p className="mt-8">
            Última atualização: 10 de Maio de 2025
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
