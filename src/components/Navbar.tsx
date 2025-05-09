import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-navy-700" />
          <span className="text-xl font-bold text-navy-700">Achei meu Lar</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-navy-700 hover:text-navy-500 font-medium">
            Início
          </Link>
          <Link to="/properties" className="text-navy-700 hover:text-navy-500 font-medium">
            Imóveis
          </Link>
          <Link to="/favorites" className="text-navy-700 hover:text-navy-500 font-medium">
            Favoritos
          </Link>
          <Link to="/about" className="text-navy-700 hover:text-navy-500 font-medium">
            Sobre
          </Link>
          <Link to="/register-property" className="btn">
            Anunciar Imóvel
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Entrar</span>
          </Button>
          <Button className="hidden md:flex bg-navy-700 hover:bg-navy-600">
            Anunciar
          </Button>
        </div>
        
        {/* Mobile navigation */}
        <div className="flex md:hidden">
          <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 px-4 bg-white border-t">
            <Link to="/" className="flex flex-col items-center justify-center">
              <Home className="w-6 h-6 text-navy-700" />
              <span className="text-xs mt-1">Início</span>
            </Link>
            <Link to="/properties" className="flex flex-col items-center justify-center">
              <Search className="w-6 h-6 text-navy-700" />
              <span className="text-xs mt-1">Buscar</span>
            </Link>
            <Link to="/favorites" className="flex flex-col items-center justify-center">
              <Heart className="w-6 h-6 text-navy-700" />
              <span className="text-xs mt-1">Favoritos</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center justify-center">
              <User className="w-6 h-6 text-navy-700" />
              <span className="text-xs mt-1">Conta</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
