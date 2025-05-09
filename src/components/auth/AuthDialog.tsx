
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
};

export default function AuthDialog({
  open,
  onOpenChange,
  defaultTab = "login",
}: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleCloseDialog = () => {
    onOpenChange(false);
    // Reset state when dialog closes
    setTimeout(() => {
      setShowForgotPassword(false);
      setActiveTab(defaultTab);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {showForgotPassword ? "Recuperar senha" : "Achei meu Lar"}
          </DialogTitle>
          <DialogDescription>
            {showForgotPassword
              ? "Enviaremos instruções para redefinir sua senha"
              : "Acesse sua conta ou crie uma nova"}
          </DialogDescription>
        </DialogHeader>

        {showForgotPassword ? (
          <ForgotPasswordForm
            onBack={() => setShowForgotPassword(false)}
            onSuccess={handleCloseDialog}
          />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <LoginForm onSuccess={handleCloseDialog} />
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-navy-700 hover:underline"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm onSuccess={handleCloseDialog} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
