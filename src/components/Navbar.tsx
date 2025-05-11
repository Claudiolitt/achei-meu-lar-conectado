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
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthDialog from './auth/AuthDialog';
import Logo from './Logo';
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

// Componente para o menu de navegação principal
const MainNavigation = () => (
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
    <ToolsDropdown />
  </nav>
);

// Componente para o dropdown de ferramentas
const ToolsDropdown = () => (
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
);

// Componente para os botões de ação do usuário autenticado
const AuthenticatedActions = ({ notificationCount }: { notificationCount: number }) => (
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
);

// Componente para o menu do anunciante
const OwnerMenu = () => (
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
);

// Componente para o menu do usuário
const UserMenu = ({ user, logout }: { user: any; logout: () => void }) => (
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
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();

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
          <MainNavigation />
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated && (
            <>
              <AuthenticatedActions notificationCount={notificationCount} />
              {user?.type === 'owner' && <OwnerMenu />}
              <UserMenu user={user} logout={logout} />
            </>
          )}
          
          {!isAuthenticated && (
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="container py-4 border-t">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar imóveis..."
              className="pl-9"
              autoFocus
            />
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
