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
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from './theme/ThemeToggle';
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
import { useIsMobile } from '@/hooks/use-mobile';
import AuthDialog from './auth/AuthDialog';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Mock notification count - in a real app this would come from a backend
  const notificationCount = 2;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6" aria-label="Navegação Principal">
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline">
              Comprar
            </Link>
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline">
              Alugar
            </Link>
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline">
              Lançamentos
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
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
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated && (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative" aria-label={`Notificações (${notificationCount} não lidas)`}>
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      <span aria-hidden="true">{notificationCount}</span>
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost" size="icon" aria-label="Mensagens">
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
                    {notificationCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {notificationCount}
                      </Badge>
                    )}
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
              <Button onClick={() => setIsAuthDialogOpen(true)}>
                Entrar / Cadastrar
              </Button>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="container py-4 space-y-4">
            <Link to="/properties" className="block text-sm font-medium">
              Comprar
            </Link>
            <Link to="/properties" className="block text-sm font-medium">
              Alugar
            </Link>
            <Link to="/properties" className="block text-sm font-medium">
              Lançamentos
            </Link>
            <Link to="/mortgage-calculator" className="block text-sm font-medium">
              Calculadora de Financiamento
            </Link>
            <Link to="/news" className="block text-sm font-medium">
              Notícias do Mercado
            </Link>
            {!isAuthenticated && (
              <Button 
                className="w-full" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthDialogOpen(true);
                }}
              >
                Entrar / Cadastrar
              </Button>
            )}
          </nav>
        </div>
      )}
      
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container py-4">
            <div className="flex items-center gap-4">
              <Input
                type="search"
                placeholder="Buscar imóveis..."
                className="flex-1"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthDialog 
        open={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
      />
    </header>
  );
};

export default Navbar;
