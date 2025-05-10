
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <Separator className="mb-6" />
        
        <div className="prose max-w-none">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o serviço Achei meu Lar, você concorda com os termos e condições descritos neste documento.
            Se você não concorda com algum destes termos, não utilize nosso serviço.
          </p>
          
          <h2>2. Descrição do Serviço</h2>
          <p>
            O Achei meu Lar é uma plataforma que conecta pessoas interessadas em imóveis com proprietários e anunciantes.
            Nossa plataforma permite buscar, anunciar e entrar em contato sobre imóveis disponíveis para venda ou aluguel.
          </p>
          
          <h2>3. Cadastro e Conta</h2>
          <p>
            Para utilizar certos recursos da plataforma, é necessário criar uma conta. Você é responsável por manter
            a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
          </p>
          
          <h2>4. Conteúdo dos Anúncios</h2>
          <p>
            Ao criar anúncios, você concorda em fornecer informações precisas e verdadeiras sobre o imóvel.
            Não é permitido publicar conteúdo ofensivo, ilegal, enganoso ou que viole direitos de terceiros.
          </p>
          
          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            O Achei meu Lar não se responsabiliza pela veracidade das informações apresentadas nos anúncios,
            por eventuais negociações entre os usuários ou por danos decorrentes do uso da plataforma.
          </p>
          
          <h2>6. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo disponibilizado pela plataforma, como textos, gráficos, logotipos, ícones e
            imagens, são propriedade do Achei meu Lar e estão protegidos por leis de direitos autorais.
          </p>
          
          <h2>7. Modificações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão
            em vigor imediatamente após sua publicação na plataforma.
          </p>
          
          <h2>8. Lei Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis brasileiras. Qualquer litígio relacionado a estes termos
            será submetido à jurisdição dos tribunais brasileiros.
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

export default TermsOfService;
