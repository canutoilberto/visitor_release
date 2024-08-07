"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/api/formStore";
import { loginWithEmailAndPassword } from "@/api/formUtils";
import regua from "../../public/regua.png";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useFormStore((state) => state.setUser);
  const user = useFormStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/agendar-visitante");
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await loginWithEmailAndPassword(email, password);
      setUser({ email: user.email, uid: user.uid });
      router.push("/agendar-visitante");
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with image and title */}
      <header className="flex flex-col items-center justify-center py-6 px-4 sm:px-6 md:px-8 lg:px-12 lg:py-8">
        <div className="relative w-full max-w-[450px] lg:max-w-[600px]">
          <Image
            src={regua}
            alt="Registro de visitantes"
            width={600}
            height={80}
            priority
            className="rounded-md shadow-md p-4"
          />
        </div>
        <h1 className="text-3xl font-semibold mt-4 lg:text-4xl">
          Registro de visitantes
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <Card className="w-full max-w-md shadow-lg lg:max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl">Bem-vindo!</CardTitle>
            <CardDescription className="text-base lg:text-lg">
              Faça login com seu e-mail para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Matrícula</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua matrícula"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500"
                  disabled={loading}
                >
                  {loading ? "Aguarde..." : "Entrar"}
                </Button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                <p className="text-center mt-4">
                  Não possui uma conta?{" "}
                  <Link
                    href="/cadastrar-conta"
                    className="text-blue-600 hover:underline"
                  >
                    Cadastrar
                  </Link>
                </p>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
