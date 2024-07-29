"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/api/formStore";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const user = useFormStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  }, [user, router]);

  return user ? children : null; // Renderiza os filhos se o usuário estiver autenticado
};

export default PrivateRoute;
