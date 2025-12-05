import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub App",
  description: "Simple and efficient application for managing personal notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <TanStackProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 md:p-8">{children}</main>
            <Footer />
          </div>

          {/* 🔥 Обов’язковий контейнер для React-порталів (модалок) */}
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
