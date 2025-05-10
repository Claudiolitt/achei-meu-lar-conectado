import { useAuth } from "@/contexts/AuthContext";
import ProfileCard from "@/components/auth/ProfileCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthDialog from "@/components/auth/AuthDialog";
import { User, Lock, Heart, Home, Settings, LogOut, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TABS = [
  { key: "profile", label: "Dados pessoais", icon: <User className="h-5 w-5 mr-2" /> },
  { key: "favorites", label: "Favoritos", icon: <Heart className="h-5 w-5 mr-2" /> },
  { key: "my-properties", label: "Meus anúncios", icon: <Home className="h-5 w-5 mr-2" /> },
  { key: "security", label: "Segurança", icon: <Lock className="h-5 w-5 mr-2" /> },
  { key: "preferences", label: "Preferências", icon: <Settings className="h-5 w-5 mr-2" /> },
];

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const isOwner = user?.type === "owner";

  useEffect(() => {
    if (!isOwner && selectedTab === "my-properties") {
      setSelectedTab("profile");
    }
  }, [isOwner, selectedTab]);

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

  // Resumo do usuário (topo)
  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);

  return (
    <div className="min-h-screen bg-navy-100 dark:bg-[#0e1624] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-10 px-2">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
          {/* Coluna esquerda: Avatar, nome, tipo, email, botões */}
          <aside className="md:w-1/3 w-full bg-white dark:bg-[#18223a] rounded-2xl shadow-lg flex flex-col items-center py-8 px-6 mb-4 md:mb-0">
            <Avatar className="h-28 w-28 mb-4 shadow-md border-4 border-navy-100 dark:border-[#232c43]">
              <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="text-center w-full">
              <div className="text-2xl font-bold mb-1 text-navy-900 dark:text-white">{user?.name}</div>
              <div className="text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">{user?.type === "owner" ? "Anunciante" : "Cliente"}</div>
              <div className="text-xs text-navy-500 dark:text-navy-300 mb-4 break-all">{user?.email}</div>
            </div>
            <div className="flex gap-2 w-full justify-center mt-2">
              <Button asChild variant="outline" size="sm" className="w-1/2">
                <Link to="/profile/edit">
                  <UserCog className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="w-1/2" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </div>
          </aside>
          {/* Coluna direita: Abas e conteúdo */}
          <main className="flex-1 w-full">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Meu Perfil</h1>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Menu lateral/abas */}
              <nav className="md:w-1/4 w-full mb-4 md:mb-0">
                <ul className="flex md:flex-col gap-2 md:gap-4">
                  {TABS.filter(tab => tab.key !== "my-properties" || isOwner).map(tab => (
                    <li key={tab.key}>
                      <Button
                        variant={selectedTab === tab.key ? "default" : "ghost"}
                        className={`w-full flex items-center justify-start rounded-xl ${selectedTab === tab.key ? "bg-navy-700 text-white" : "dark:text-navy-200"}`}
                        onClick={() => setSelectedTab(tab.key)}
                      >
                        {tab.icon}
                        {tab.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Conteúdo da aba */}
              <section className="flex-1">
                {selectedTab === "profile" && (
                  <div className="bg-white dark:bg-[#18223a] rounded-2xl p-8 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-navy-900 dark:text-white">Dados pessoais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-3"><span className="font-semibold text-navy-700 dark:text-navy-200">Nome:</span> <span className="text-navy-900 dark:text-white">{user?.name}</span></div>
                        <div className="mb-3"><span className="font-semibold text-navy-700 dark:text-navy-200">Email:</span> <span className="text-navy-900 dark:text-white">{user?.email}</span></div>
                        {user?.phone && <div className="mb-3"><span className="font-semibold text-navy-700 dark:text-navy-200">Telefone:</span> <span className="text-navy-900 dark:text-white">{user?.phone}</span></div>}
                        {user?.cpf && <div className="mb-3"><span className="font-semibold text-navy-700 dark:text-navy-200">CPF:</span> <span className="text-navy-900 dark:text-white">{user?.cpf}</span></div>}
                      </div>
                    </div>
                  </div>
                )}
                {selectedTab === "favorites" && (
                  <div className="bg-white dark:bg-[#18223a] rounded-2xl p-8 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-navy-900 dark:text-white">Favoritos</h2>
                    <Button asChild>
                      <Link to="/favorites">Ver meus favoritos</Link>
                    </Button>
                  </div>
                )}
                {selectedTab === "my-properties" && isOwner && (
                  <div className="bg-white dark:bg-[#18223a] rounded-2xl p-8 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-navy-900 dark:text-white">Meus anúncios</h2>
                    <Button asChild>
                      <Link to="/my-properties">Ver meus anúncios</Link>
                    </Button>
                    <Button asChild variant="outline" className="ml-3">
                      <Link to="/register-property">Adicionar novo imóvel</Link>
                    </Button>
                  </div>
                )}
                {selectedTab === "security" && (
                  <div className="bg-white dark:bg-[#18223a] rounded-2xl p-8 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-navy-900 dark:text-white">Segurança</h2>
                    <p className="text-muted-foreground mb-2">Em breve: alterar senha, autenticação em duas etapas, etc.</p>
                  </div>
                )}
                {selectedTab === "preferences" && (
                  <div className="bg-white dark:bg-[#18223a] rounded-2xl p-8 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-navy-900 dark:text-white">Preferências</h2>
                    <p className="text-muted-foreground mb-2">Em breve: preferências de notificação, tema, etc.</p>
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
