import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Users, MessageSquare, HandHeart, Receipt, MapPin, CreditCard } from "lucide-react";

const Index = () => {
  const modules = [
    {
      title: "Avisos de la administración",
      description: "Comunicados importantes",
      icon: Bell,
      variant: "primary",
      notifications: 2
    },
    {
      title: "Mis paquetes",
      description: "Entregas y encomiendas",
      icon: Package,
      variant: "accent",
      notifications: 1
    },
    {
      title: "Visitas autorizadas",
      description: "Autorizar o denegar visitantes",
      icon: Users,
      variant: "primary",
      notifications: 0
    },
    {
      title: "Comentarios o quejas",
      description: "Reportar problemas",
      icon: MessageSquare,
      variant: "accent",
      notifications: 0
    },
    {
      title: "Ayuda vecinal",
      description: "Solicitar ayuda entre vecinos",
      icon: HandHeart,
      variant: "primary",
      notifications: 0
    },
    {
      title: "Pagos y recibos",
      description: "Estado de cuenta y pagos",
      icon: Receipt,
      variant: "accent",
      notifications: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Bienvenido a Veciapp</h1>
          <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
            Torre A - Apt 203
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground text-xl">
            Gestiona todos los servicios de tu conjunto residencial de manera fácil y segura.
          </p>
        </div>

        {/* Modules Grid - Diseño para tercera edad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            const isAccent = module.variant === "accent";
            return (
              <Card 
                key={index} 
                className={`relative cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isAccent ? 'bg-accent text-accent-foreground border-accent' : 'bg-primary text-primary-foreground border-primary'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-white/20">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold mb-2">{module.title}</CardTitle>
                      <p className="text-lg opacity-90">{module.description}</p>
                    </div>
                    {module.notifications > 0 && (
                      <Badge variant="destructive" className="h-8 w-8 p-0 flex items-center justify-center text-lg font-bold">
                        {module.notifications}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Información adicional */}
        <div className="mt-12 p-6 bg-muted rounded-xl text-center">
          <h3 className="text-2xl font-semibold mb-4">Información importante</h3>
          <p className="text-xl text-muted-foreground">
            Si necesitas ayuda para usar la aplicación, contacta a la administración o pide asistencia a un familiar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
