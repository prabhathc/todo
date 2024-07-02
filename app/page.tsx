import TaskBoard from "./components/TaskBoard";

export default function Home() {
  return (
    <main className="min-h-screen bg-french-gray">
      <div className="flex flex-col items-center justify-center">
        <TaskBoard />
      </div>
    </main>
  );
}
