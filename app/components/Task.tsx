import { TaskType } from "../types/types";
import * as Icons from "@heroicons/react/24/outline";
import * as FilledIcons from "@heroicons/react/24/solid";

interface TaskProps {
  task: TaskType;
  deleteTask: Function;
  isSelected: boolean;
  togglePin: (id: number) => void;
}

export default function Task({ task, deleteTask, togglePin, isSelected }: TaskProps) {
  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleTogglePin = () => {
    togglePin(task.id);
  };

  return (
    <div className={`group ${isSelected ? "bg-cool-gray text-white" : "text-med-gray"}`}>
      <div className="flex py-3 px-4 justify-between hover:bg-cool-gray hover:text-white duration-200 w-full">
        <div className="flex flex-col items-start justify-center">
          <div className="text-sm px-2">
            {task.title}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button onClick={handleTogglePin} className="">
            {task.pinned ? (
              <FilledIcons.StarIcon className="w-6 h-6 text-yellow-500 opacity-100 duration-200" />
            ) : (
              <Icons.StarIcon className="w-6 h-6 opacity-100 duration-200" />
            )}
          </button>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        </div>
      </div>
    </div>
  );
}
