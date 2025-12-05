"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query"; // ⬅️ Додано HydrationBoundary
import { useState } from "react";

// Експортуємо HydrationBoundary, щоб використовувати його у SSR-компонентах Next.js
export { HydrationBoundary };
// ⬅️ CRITICAL: Експорт для використання у Server Components

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ініціалізація QueryClient один раз
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Опціонально: налаштування кешування
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000, // Дані вважаються свіжими 5 секунд
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
