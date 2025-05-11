import React from 'react';
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
import ProfilePanel from '@/components/auth/ProfilePanel';

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
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/3 w-full">
            <ProfileCard />
          </aside>
          <main className="flex-1">
            <ProfilePanel />
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
