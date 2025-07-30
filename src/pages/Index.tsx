import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, CreditCard, Bell, Users, FileText, Settings, MapPin } from "lucide-react";

const Index = () => {
  const modules = [
    {
      title: "Entregas",
      description: "Gestiona tus entregas y paquetes",
      icon: Package,
      color: "bg-blue-500",
      notifications: 3
    },
    {
      title: "Mis pagos",
      description: "Administra tus pagos mensuales",
      icon: CreditCard,
      color: "bg-green-500",
      notifications: 1
    },
    {
      title: "Avisos",
      description: "Comunicados y notificaciones",
      icon: Bell,
      color: "bg-yellow-500",
      notifications: 5
    },
    {
      title: "Vecinos",
      description: "Directorio de vecinos",
      icon: Users,
      color: "bg-purple-500",
      notifications: 0
    },
    {
      title: "Documentos",
      description: "Reglamentos y documentos",
      icon: FileText,
      color: "bg-orange-500",
      notifications: 0
    },
    {
      title: "Configuración",
      description: "Ajustes de la aplicación",
      icon: Settings,
      color: "bg-gray-500",
      notifications: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            <h1 className="text-xl font-bold">VeciApp</h1>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Torre A - Apt 203
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Bienvenido</h2>
          <p className="text-muted-foreground text-sm">
            Gestiona todos los servicios de tu conjunto residencial desde una sola aplicación.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="relative cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    {module.notifications > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {module.notifications}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-sm font-medium mb-1">{module.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-md font-semibold mb-4">Accesos rápidos</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Package className="h-4 w-4 mr-2" />
              Registrar nueva entrega
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Ver últimos avisos
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Consultar estado de cuenta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
