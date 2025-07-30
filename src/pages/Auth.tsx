import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Shield, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserRole = 'resident' | 'guard' | 'admin';
type AuthMode = 'landing' | 'login' | 'signup';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('landing');
  const [userType, setUserType] = useState<UserRole>('resident');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    apartmentNumber: '',
    tower: '',
    phone: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            role: userType,
            apartment_number: formData.apartmentNumber,
            tower: formData.tower,
            phone: formData.phone
          }
        }
      });

      if (error) {
        if (error.message.includes('already')) {
          toast({
            title: "Usuario existente",
            description: "Este correo ya está registrado. Intenta iniciar sesión.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "¡Registro exitoso!",
          description: "Revisa tu correo para confirmar tu cuenta",
        });
        setMode('login');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al registrarse",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Por favor ingrese email y contraseña",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast({
          title: "Error",
          description: "Credenciales incorrectas",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al iniciar sesión",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeInfo = (type: UserRole) => {
    switch (type) {
      case 'resident':
        return {
          title: 'Residentes',
          description: 'Para vecinos del conjunto residencial',
          icon: User,
          variant: 'primary' as const
        };
      case 'guard':
        return {
          title: 'Vigilantes',
          description: 'Para personal de seguridad',
          icon: Shield,
          variant: 'accent' as const
        };
      case 'admin':
        return {
          title: 'Administradores',
          description: 'Para administración del edificio',
          icon: Building2,
          variant: 'accent' as const
        };
    }
  };

  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-5xl font-bold mb-4">Bienvenido a Veciapp</h1>
            <p className="text-2xl mb-8">
              La aplicación más fácil de usar para gestionar tu conjunto residencial
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white text-xl px-6 py-3">
              Diseñada especialmente para personas de la tercera edad
            </Badge>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              ¿Cómo quieres acceder?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['resident', 'guard', 'admin'] as UserRole[]).map((type) => {
                const info = getUserTypeInfo(type);
                const IconComponent = info.icon;
                const isAccent = info.variant === 'accent';
                
                return (
                  <Card 
                    key={type}
                    className={`cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isAccent ? 'bg-accent text-accent-foreground border-accent' : 'bg-primary text-primary-foreground border-primary'
                    }`}
                    onClick={() => {
                      setUserType(type);
                      setMode('login');
                    }}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="mx-auto p-6 rounded-full bg-white/20 mb-4">
                        <IconComponent className="h-16 w-16 text-white" />
                      </div>
                      <CardTitle className="text-3xl font-bold mb-3">{info.title}</CardTitle>
                      <p className="text-xl opacity-90">{info.description}</p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button 
                        size="lg" 
                        className="w-full text-xl py-6 bg-white/20 hover:bg-white/30 text-white border-white/20"
                        variant="outline"
                      >
                        Seleccionar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* App Features */}
            <div className="mt-16 p-8 bg-muted rounded-xl">
              <h3 className="text-3xl font-bold text-center mb-8">¿Qué puedes hacer con Veciapp?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
                <div className="space-y-4">
                  <p>✓ Recibir avisos importantes de la administración</p>
                  <p>✓ Gestionar tus paquetes y entregas</p>
                  <p>✓ Autorizar visitas de manera sencilla</p>
                </div>
                <div className="space-y-4">
                  <p>✓ Solicitar ayuda entre vecinos</p>
                  <p>✓ Consultar tus pagos y recibos</p>
                  <p>✓ Reportar comentarios o quejas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userInfo = getUserTypeInfo(userType);
  const IconComponent = userInfo.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            onClick={() => setMode('landing')}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          
          <div className="mx-auto p-4 rounded-full bg-primary text-primary-foreground mb-4">
            <IconComponent className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </CardTitle>
          <p className="text-muted-foreground">{userInfo.title}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={mode === 'login' ? handleSignIn : handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="text-lg p-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="text-lg p-4"
              />
            </div>

            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="text-lg p-4"
                  />
                </div>

                {userType === 'resident' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tower">Torre</Label>
                      <Input
                        id="tower"
                        name="tower"
                        value={formData.tower}
                        onChange={handleInputChange}
                        placeholder="Ej: A, B, C"
                        className="text-lg p-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apartmentNumber">Número de apartamento</Label>
                      <Input
                        id="apartmentNumber"
                        name="apartmentNumber"
                        value={formData.apartmentNumber}
                        onChange={handleInputChange}
                        placeholder="Ej: 203, 504"
                        className="text-lg p-4"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-lg p-4"
                  />
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full text-xl py-6" 
              size="lg"
              disabled={loading}
            >
              {loading ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-lg"
            >
              {mode === 'login' 
                ? '¿No tienes cuenta? Regístrate aquí' 
                : '¿Ya tienes cuenta? Inicia sesión'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;