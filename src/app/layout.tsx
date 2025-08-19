import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emoré Elegance",
  description: "Quality wear imported from Italy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-body antialiased h-full" suppressHydrationWarning>
          <CartProvider>
            {children}
          </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
