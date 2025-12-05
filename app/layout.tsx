import { Metadata } from "next"; // ✅ Імпорт типу Metadata
import "./globals.css"; // Ваш глобальний файл стилів
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// ✅ Додано тип Metadata
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

          {/* 🔥 Додаємо контейнер для модального порталу */}
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
