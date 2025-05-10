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
import { cn } from "@/lib/utils";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCloseDialog = () => {
    setIsAnimating(true);
    onOpenChange(false);
    // Reset state when dialog closes
    setTimeout(() => {
      setShowForgotPassword(false);
      setActiveTab(defaultTab);
      setIsAnimating(false);
    }, 300);
  };

  const handleTabChange = (value: string) => {
    setIsAnimating(true);
    setActiveTab(value as "login" | "register");
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleForgotPassword = () => {
    setIsAnimating(true);
    setShowForgotPassword(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBackToLogin = () => {
    setIsAnimating(true);
    setShowForgotPassword(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className={cn(
        "sm:max-w-md transition-all duration-300",
        open ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <DialogHeader className="transition-all duration-300">
          <DialogTitle className={cn(
            "transition-all duration-300",
            showForgotPassword ? "translate-y-0" : "translate-y-0"
          )}>
            {showForgotPassword ? "Recuperar senha" : "Achei meu Lar"}
          </DialogTitle>
          <DialogDescription className={cn(
            "transition-all duration-300",
            showForgotPassword ? "translate-y-0" : "translate-y-0"
          )}>
            {showForgotPassword
              ? "Enviaremos instruções para redefinir sua senha"
              : "Acesse sua conta ou crie uma nova"}
          </DialogDescription>
        </DialogHeader>

        <div className={cn(
          "transition-all duration-300",
          isAnimating ? "opacity-0" : "opacity-100"
        )}>
          {showForgotPassword ? (
            <div className={cn(
              "transition-all duration-300",
              showForgotPassword ? "translate-x-0" : "translate-x-full"
            )}>
              <ForgotPasswordForm
                onBack={handleBackToLogin}
                onSuccess={handleCloseDialog}
              />
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger 
                  value="login"
                  className={cn(
                    "transition-all duration-300",
                    activeTab === "login" ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className={cn(
                    "transition-all duration-300",
                    activeTab === "register" ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  Cadastro
                </TabsTrigger>
              </TabsList>

              <TabsContent 
                value="login" 
                className={cn(
                  "space-y-4 transition-all duration-300",
                  activeTab === "login" ? "translate-x-0" : "-translate-x-full"
                )}
              >
                <LoginForm onSuccess={handleCloseDialog} />
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-navy-700 hover:underline transition-colors duration-200"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
              </TabsContent>

              <TabsContent 
                value="register"
                className={cn(
                  "transition-all duration-300",
                  activeTab === "register" ? "translate-x-0" : "translate-x-full"
                )}
              >
                <RegisterForm onSuccess={handleCloseDialog} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
