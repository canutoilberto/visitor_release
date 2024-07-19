import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PORTARIA - Liberação de visitantes",
  description:
    "Aplicativo de liberação de visitantes às empreses da Rede Paraíba de Comunicação",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
