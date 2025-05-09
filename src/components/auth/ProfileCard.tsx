
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCog, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.photoUrl} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            {user.type === "client" ? "Cliente" : "Anunciante"}
            {user.verified && (
              <Badge variant="outline" className="ml-1 text-xs bg-green-50 text-green-700 border-green-200">
                Verificado
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
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
