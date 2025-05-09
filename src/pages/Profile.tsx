
import { useAuth } from "@/contexts/AuthContext";
import ProfileCard from "@/components/auth/ProfileCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthDialog from "@/components/auth/AuthDialog";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Acesse sua conta</h1>
          <p className="text-gray-600">
            Faça login ou crie uma conta para acessar seu perfil e gerenciar seus imóveis favoritos.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => setAuthDialogOpen(true)}
              className="w-full bg-navy-700 hover:bg-navy-600"
            >
              Entrar ou Cadastrar
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Voltar para a página inicial</Link>
            </Button>
          </div>

          <AuthDialog 
            open={authDialogOpen} 
            onOpenChange={setAuthDialogOpen} 
            defaultTab="login" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div>
          <ProfileCard />
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Meus Favoritos</h2>
            <p className="text-muted-foreground">
              Acesse seus imóveis favoritos e fique por dentro das novidades.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/favorites">Ver meus favoritos</Link>
            </Button>
          </div>

          {user.type === "owner" && (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Meus Anúncios</h2>
              <p className="text-muted-foreground">
                Gerencie seus imóveis anunciados e veja estatísticas de visualização.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/my-properties">Ver meus anúncios</Link>
              </Button>
              <Button className="mt-4 ml-3" variant="outline" asChild>
                <Link to="/register-property">Adicionar novo imóvel</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
