import { TaskType } from "../types/types";
import * as Icons from "@heroicons/react/24/outline";

interface TaskProps {
  task: TaskType;
  deleteTask: Function;
}

export default function Task({ task, deleteTask }: TaskProps) {
  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="group">
      <div className="flex justify-between py-3 px-4 hover:bg-cool-gray text-med-gray hover:text-white duration-200 w-full">
        <div className="flex flex-col px-2">
          <div className="text-sm">{task.title}</div>
        </div>
        <button onClick={handleDelete} className="flex items-center justify-center">
          <Icons.XMarkIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 duration-200" />
        </button>
      </div>
    </div>
  );
}
