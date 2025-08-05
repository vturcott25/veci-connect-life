import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Package, 
  Users, 
  MessageSquare, 
  HandHeart, 
  Receipt,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { profile } = useAuth();

  const statsCards = [
    {
      title: "Avisos Activos",
      value: "3",
      icon: Bell,
      trend: "+2 esta semana",
      variant: "primary"
    },
    {
      title: "Paquetes Pendientes",
      value: "1",
      icon: Package,
      trend: "Entrega hoy",
      variant: "accent"
    },
    {
      title: "Visitas Autorizadas",
      value: "5",
      icon: Users,
      trend: "Hoy",
      variant: "primary"
    },
    {
      title: "Pagos al Día",
      value: "✓",
      icon: CheckCircle,
      trend: "Hasta Enero 2025",
      variant: "accent"
    }
  ];

  const recentActivity = [
    {
      type: "package",
      title: "Paquete recibido",
      description: "Vigilante Carlos recibió tu paquete de Amazon",
      time: "Hace 2 horas",
      icon: Package,
      variant: "primary"
    },
    {
      type: "notice",
      title: "Nuevo aviso",
      description: "Mantenimiento de ascensores programado",
      time: "Hace 4 horas",
      icon: Bell,
      variant: "accent"
    },
    {
      type: "visit",
      title: "Visita autorizada",
      description: "María González autorizada para el Apt 302",
      time: "Ayer",
      icon: Users,
      variant: "primary"
    }
  ];

  const quickActions = [
    {
      title: "Autorizar Visita",
      description: "Gestionar visitantes",
      icon: Users,
      variant: "primary"
    },
    {
      title: "Solicitar Ayuda",
      description: "Ayuda vecinal",
      icon: HandHeart,
      variant: "accent"
    },
    {
      title: "Ver Paquetes",
      description: "Entregas pendientes",
      icon: Package,
      variant: "primary"
    },
    {
      title: "Hacer Comentario",
      description: "Reportar problema",
      icon: MessageSquare,
      variant: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">Dashboard Veci-Connect-Life</h1>
              <p className="text-xl opacity-90">
                Bienvenido de vuelta, {profile?.full_name}
              </p>
              {profile?.apartment_number && profile?.tower && (
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2 mt-2">
                  Torre {profile.tower} - Apt {profile.apartment_number}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Stats Overview */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Resumen del Estado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon;
              const isAccent = stat.variant === "accent";
              return (
                <Card 
                  key={index}
                  className={`${
                    isAccent ? 'bg-accent text-accent-foreground border-accent' : 'bg-primary text-primary-foreground border-primary'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <p className="text-sm opacity-80">{stat.trend}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              Actividad Reciente
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = activity.icon;
                    const isAccent = activity.variant === "accent";
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <div className={`p-3 rounded-full ${
                          isAccent ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold mb-1">{activity.title}</h4>
                          <p className="text-muted-foreground mb-2">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Acciones Rápidas
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    const isAccent = action.variant === "accent";
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={`h-auto p-6 flex flex-col items-center gap-3 text-center hover:scale-105 transition-transform ${
                          isAccent 
                            ? 'border-accent hover:bg-accent hover:text-accent-foreground' 
                            : 'border-primary hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        <IconComponent className="h-8 w-8" />
                        <div>
                          <div className="font-semibold text-lg mb-1">{action.title}</div>
                          <div className="text-sm opacity-70">{action.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <AlertTriangle className="h-7 w-7 text-primary" />
              Alertas y Recordatorios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Receipt className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold">Pago de Administración</h4>
                </div>
                <p className="text-muted-foreground">Próximo vencimiento: 15 de Febrero</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Reunión de Vecinos</h4>
                </div>
                <p className="text-muted-foreground">Próxima reunión: 20 de Febrero</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;