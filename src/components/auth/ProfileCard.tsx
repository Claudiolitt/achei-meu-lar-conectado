import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCog, LogOut, CheckCircle, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function ProfileCard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Exemplo de cálculo de nível de cadastro
  const cadastroSteps = [
    { label: "Endereço de e-mail", done: !!user.email },
    { label: "Número de telefone", done: !!user.phone },
    { label: "Facebook", done: !!user.facebookConnected },
  ];
  const cadastroPercent = (cadastroSteps.filter(s => s.done).length / cadastroSteps.length) * 100;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.avatar || undefined} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            {user.name}
            <span className="ml-2 flex items-center text-green-500 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1 inline-block" />online
            </span>
          </CardTitle>
          <div className="text-xs text-muted-foreground mt-1">
            Na plataforma desde {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2024"}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>{user.address?.city || "Cidade"}, {user.address?.state || "UF"}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Nível de cadastro</span>
            <span className="text-xs text-muted-foreground">{cadastroPercent}%</span>
          </div>
          <Progress value={cadastroPercent} className="h-2" />
        </div>
        <ul className="mb-2 space-y-1">
          {cadastroSteps.map((step, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle className={`h-4 w-4 ${step.done ? 'text-green-500' : 'text-muted-foreground'}`} />
              {step.label}
              {step.label === "Facebook" && !step.done && (
                <Button size="xs" variant="outline" className="ml-2 px-2 py-0 h-6 text-xs flex items-center gap-1">
                  <Facebook className="h-3 w-3" />
                  Conectar
                </Button>
              )}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-[100px_1fr] items-center">
          <span className="text-muted-foreground">Email:</span>
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-muted-foreground">Telefone:</span>
            <span>{user.phone}</span>
          </div>
        )}
        {user.cpf && (
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-muted-foreground">CPF:</span>
            <span>{user.cpf}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/profile/edit">
            <UserCog className="mr-2 h-4 w-4" />
            Editar perfil
          </Link>
        </Button>
        <Button variant="secondary" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </CardFooter>
    </Card>
  );
}
