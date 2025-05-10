
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function PrivacyConsent() {
  const [open, setOpen] = useState(false);
  const [essentialConsent, setEssentialConsent] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Check if user has previously given consent
    const hasConsent = localStorage.getItem("privacy-consent");
    if (!hasConsent) {
      // Show consent dialog after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    // Save user preferences
    localStorage.setItem(
      "privacy-consent",
      JSON.stringify({
        essential: essentialConsent,
        analytics: analyticsConsent,
        marketing: marketingConsent,
        timestamp: new Date().toISOString(),
      })
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Suas preferências de privacidade</DialogTitle>
          <DialogDescription>
            Valorizamos sua privacidade e queremos ser transparentes sobre como usamos seus dados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="essential"
              checked={essentialConsent}
              onCheckedChange={(checked) => setEssentialConsent(!!checked)}
              disabled
            />
            <div className="space-y-1">
              <Label htmlFor="essential" className="font-medium">
                Cookies essenciais (obrigatórios)
              </Label>
              <p className="text-sm text-muted-foreground">
                Estes cookies são necessários para o funcionamento do site e não podem ser desativados.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="analytics"
              checked={analyticsConsent}
              onCheckedChange={(checked) => setAnalyticsConsent(!!checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="analytics" className="font-medium">
                Análise e desempenho
              </Label>
              <p className="text-sm text-muted-foreground">
                Nos ajudam a entender como os visitantes interagem com o site, coletando
                e relatando informações anonimamente.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(!!checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="marketing" className="font-medium">
                Marketing e personalização
              </Label>
              <p className="text-sm text-muted-foreground">
                Utilizados para rastrear visitantes em sites para exibir anúncios relevantes
                e personalizados.
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            Para mais informações, consulte nossa{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Política de Privacidade
            </Link>{" "}
            e{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Termos de Uso
            </Link>
            .
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setAnalyticsConsent(false);
                setMarketingConsent(false);
                handleSave();
              }}
            >
              Apenas essenciais
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setAnalyticsConsent(true);
                setMarketingConsent(true);
                handleSave();
              }}
            >
              Aceitar todos
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={handleSave}
          >
            Salvar preferências
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
