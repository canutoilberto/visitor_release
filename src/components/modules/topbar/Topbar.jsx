"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/api/formStore";
import { logoutUser } from "@/api/formUtils";

const Topbar = () => {
  const setUser = useFormStore((state) => state.setUser);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  if (!isMounted) return null;

  return (
    <header className="w-full bg-background border-b mb-4">
      <div className="container mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-medium">Registro de visitantes</div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default Topbar;

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
