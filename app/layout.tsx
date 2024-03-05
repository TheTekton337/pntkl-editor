import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pntkl-editor",
  description: "IDE powered by monaco editor for consumption by react-native",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
