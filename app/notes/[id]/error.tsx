"use client";

import { useEffect } from "react";

export default function NoteDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Note details route error:", error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
