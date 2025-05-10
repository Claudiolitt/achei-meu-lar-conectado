
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  X, 
  Building, 
  Plus, 
  ListFilter, 
  Store,
  CreditCard,
  Users,
  MessageCircle,
  Bell,
  Calculator,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Mock notification count - in a real app this would come from a backend
  const notificationCount = 2;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ImóveisApp</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary">
              Comprar
            </Link>
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary">
              Alugar
            </Link>
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary">
              Lançamentos
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
                Ferramentas
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/mortgage-calculator" className="flex items-center">
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculadora de Financiamento</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/news" className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Notícias do Mercado</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated && (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
          
          {isAuthenticated && user?.type === 'owner' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Store className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Anunciante</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Gestão de anúncios</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/property-registration">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Novo anúncio</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/properties">
                    <ListFilter className="mr-2 h-4 w-4" />
                    <span>Meus anúncios</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Planos e assinaturas</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/subscriptions">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Planos de anunciante</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/listing-highlight">
                    <Building className="mr-2 h-4 w-4" />
                    <span>Destaque de anúncios</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/partnerships">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Parcerias</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user?.photoUrl ? (
                    <img 
                      src={user.photoUrl} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favoritos</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notificações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/edit">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Informações</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/terms">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Termos de Uso</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Política de Privacidade</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/properties" className="text-sm font-medium" onClick={toggleMenu}>
              Comprar
            </Link>
            <Link to="/properties" className="text-sm font-medium" onClick={toggleMenu}>
              Alugar
            </Link>
            <Link to="/properties" className="text-sm font-medium" onClick={toggleMenu}>
              Lançamentos
            </Link>
            <Link to="/mortgage-calculator" className="text-sm font-medium" onClick={toggleMenu}>
              Calculadora de Financiamento
            </Link>
            <Link to="/news" className="text-sm font-medium" onClick={toggleMenu}>
              Notícias do Mercado
            </Link>
            {isAuthenticated && (
              <>
                <Separator />
                <Link to="/profile" className="text-sm font-medium" onClick={toggleMenu}>
                  Meu Perfil
                </Link>
                <Link to="/favorites" className="text-sm font-medium" onClick={toggleMenu}>
                  Favoritos
                </Link>
                <Link to="/notifications" className="text-sm font-medium" onClick={toggleMenu}>
                  Notificações
                </Link>
                <Link to="/chat" className="text-sm font-medium" onClick={toggleMenu}>
                  Chat
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Separator />
                <Link to="/login" className="text-sm font-medium" onClick={toggleMenu}>
                  Entrar
                </Link>
                <Link to="/register" className="text-sm font-medium" onClick={toggleMenu}>
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
      
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-16 bg-background border-b p-4 shadow-lg">
          <div className="container mx-auto flex items-center gap-2">
            <Input 
              type="search" 
              placeholder="Buscar por localização, tipo de imóvel..." 
              className="flex-1"
              autoFocus
            />
            <Button>Buscar</Button>
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
