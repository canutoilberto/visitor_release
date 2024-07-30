"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useFormStore } from "@/api/formStore";

const CadastrarConta = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const createUser = useFormStore((state) => state.createUser);
  const loading = useFormStore((state) => state.loading);
  const error = useFormStore((state) => state.error);
  const router = useRouter();

  // Estado para controlar se estamos no lado do cliente
  const [isClient, setIsClient] = useState(false);

  // useEffect para setar o estado do cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, matricula);
      if (!error) {
        // Limpar o formulário
        setFirstName("");
        setLastName("");
        setEmail("");
        setMatricula("");
        // Redirecionar para a rota "/"
        router.push("/agendamentos");
      }
    } catch (err) {
      console.error("Erro ao criar usuário: ", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="Digite seu nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Digite seu sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matricula">Sua matrícula</Label>
                <Input
                  id="matricula"
                  placeholder="Digite sua matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">
                  A matrícula deve conter 3 zeros à esquerda (por exemplo:
                  000123).
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? "Aguarde..." : "Criar conta"}
              </Button>
              {isClient && error && (
                <p className="text-red-600 mt-2">{error}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CadastrarConta;
