import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomOrderProvider } from "@/components/CustomOrderSheet";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trey's Bakery | Tatlı krizinin en şık hali",
  description: "Butik pastane ve fırın - pastalar, kurabiyeler, cupcake'ler ve özel siparişler.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} font-sans min-h-screen bg-[#0a0708] text-white antialiased`}>
        <CustomOrderProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CustomOrderProvider>
      </body>
    </html>
  );
}
