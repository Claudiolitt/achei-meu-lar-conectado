
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, User, Search, Menu, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AuthDialog from './auth/AuthDialog';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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
          {isAuthenticated && user?.type === 'owner' && (
            <Link to="/register-property" className="text-navy-700 hover:text-navy-500 font-medium">
              Anunciar Imóvel
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarImage src={user?.photoUrl} alt={user?.name} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">Favoritos</Link>
                </DropdownMenuItem>
                {user?.type === 'owner' && (
                  <DropdownMenuItem asChild>
                    <Link to="/my-properties">Meus Anúncios</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden md:flex items-center space-x-2"
                onClick={() => setAuthDialogOpen(true)}
              >
                <User className="w-4 h-4" />
                <span>Entrar</span>
              </Button>
              <Button 
                className="hidden md:flex bg-navy-700 hover:bg-navy-600"
                onClick={() => setAuthDialogOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Cadastrar
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                    Início
                  </Link>
                  <Link to="/properties" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                    Imóveis
                  </Link>
                  <Link to="/favorites" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                    Favoritos
                  </Link>
                  <Link to="/about" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                    Sobre
                  </Link>
                  {isAuthenticated && user?.type === 'owner' && (
                    <Link to="/register-property" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Anunciar Imóvel
                    </Link>
                  )}
                  
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        Meu Perfil
                      </Link>
                      <button 
                        onClick={() => logout()}
                        className="px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2 px-4 pt-4 border-t">
                      <Button 
                        className="w-full" 
                        onClick={() => setAuthDialogOpen(true)}
                      >
                        Entrar
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setAuthDialogOpen(true);
                        }}
                      >
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile navigation (bottom bar) */}
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

      {/* Auth Dialog */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </header>
  );
};

export default Navbar;
