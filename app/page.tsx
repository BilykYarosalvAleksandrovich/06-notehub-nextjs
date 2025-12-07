import css from "./Home.module.css";

export default function HomePage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>
        NoteHub is a simple and efficient application designed for managing
        personal notes. It helps keep your thoughts organized and accessible.
      </p>
      <p className={css.description}>
        The app provides a clean interface for writing, editing, and browsing
        notes with keyword search and structured organization.
      </p>
    </main>
  );
}
