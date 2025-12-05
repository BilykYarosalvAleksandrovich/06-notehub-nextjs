"use client"; // Обов'язково

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Notes route error:", error);
  }, [error]);

  return (
    <div>
      {/* ⬅️ Вивід повідомлення про помилку */}
      <p>Could not fetch the list of notes. {error.message}</p>
      {/* Завжди додайте reset для можливості відновлення */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
