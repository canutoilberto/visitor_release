"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Alterar de registration para password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useFormStore((state) => state.setUser); // Certifique-se de que está correto
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await loginWithEmailAndPassword(email, password);
      setUser({ email: user.email, uid: user.uid }); // Atualiza o estado com o usuário
      router.push("/agendar-visitante"); // Redireciona para a rota de agendar visitante
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo!</CardTitle>
          <CardDescription>
            Faça login com sua conta para continuar.
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
              <Label htmlFor="password">Senha</Label>{" "}
              {/* Alterar de registration para password */}
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
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
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
