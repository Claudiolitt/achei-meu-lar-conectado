import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8fafc] dark:bg-[#0e1624] text-navy-900 dark:text-white pt-12 pb-6 transition-colors">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6 text-navy-900 dark:text-white" />
              <span className="text-xl font-bold text-navy-900 dark:text-white">Imóveis Conecta</span>
            </div>
            <p className="mb-4 text-navy-900 dark:text-white">
              Encontre o imóvel dos seus sonhos de forma rápida e prática.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-900 dark:text-white">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Página inicial
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Sobre nós
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-900 dark:text-white">Imóveis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Casas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Comercial
                </Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  Terrenos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-900 dark:text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-navy-900 dark:text-white" />
                <a href="mailto:contato@acheimeular.com.br" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  contato@acheimeular.com.br
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-navy-900 dark:text-white" />
                <a href="tel:+551199999999" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white transition duration-200">
                  +55 (11) 9999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-200 dark:border-[#232c43] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-navy-900 dark:text-white text-sm">
            © {new Date().getFullYear()} Imóveis Conecta. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white text-sm">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-navy-900 dark:text-white hover:text-primary dark:hover:text-white text-sm">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
