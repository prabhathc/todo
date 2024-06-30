import TaskBoard from "./components/TaskBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-french-gray">
      <TaskBoard />
    </main>
  );
}
