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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full" suppressHydrationWarning>
          <CartProvider>
            {children}
          </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
