import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CadastrarConta = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with title */}
      <header className="flex flex-col items-center justify-center py-6">
        <h1 className="text-3xl font-semibold">Criar Conta</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <Card className="w-full max-w-md shadow-lg lg:max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl">
              Cadastrar conta
            </CardTitle>
            <CardDescription className="text-base lg:text-lg">
              Já possui uma conta?{" "}
              <Link href="/" className="text-blue-600 underline">
                Faça o login
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="Digite seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Digite seu sobrenome"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail corporativo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matricula">Sua matrícula</Label>
                <Input
                  id="matricula"
                  placeholder="Digite sua matrícula"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                Criar conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarConta;
