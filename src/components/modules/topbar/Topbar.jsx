"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/api/formStore";
import { MdOutlineLogout } from "react-icons/md";
import Logo from "../../../../public/logo-small-2.webp";
import Image from "next/image";

const Topbar = () => {
  const logout = useFormStore((state) => state.logout);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  if (!isMounted) return null;

  return (
    <header className="w-full bg-background border-b mb-4">
      <div className="container mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="Logomarca" width={42} height={42} />
          <div className="text-lg font-semibold ml-2">
            Registro de visitantes
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="rounded p-4 flex gap-1 items-center justify-center"
          onClick={handleLogout}
        >
          <MdOutlineLogout className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
