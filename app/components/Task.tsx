import { TaskType } from "../types/types";
import * as Icons from "@heroicons/react/24/outline";
import * as FilledIcons from "@heroicons/react/24/solid";

interface TaskProps {
  task: TaskType;
  deleteTask: Function;
  togglePin: (id: number) => void;
  isExpanded: boolean;
}

export default function Task({ task, deleteTask, togglePin, isExpanded }: TaskProps) {
  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleTogglePin = () => {
    togglePin(task.id);
  };

  return (
    <div className="group">
      <div className="flex py-3 px-4 justify-center hover:bg-cool-gray text-med-gray hover:text-white duration-200 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className={`transition-opacity text-sm duration-500 ${isExpanded ? 'opacity-100 px-2' : 'opacity-0'}`}>
            {isExpanded ? task.title : ''}
          </div>
          <div className={`transition-opacity text-sm duration-500 ${!isExpanded ? 'opacity-100 px-2' : 'opacity-0'}`}>
            {!isExpanded ? task.id : ''}
          </div>
        </div>
        {isExpanded && (
          <div className="flex flex-grow justify-end">
            <button onClick={handleTogglePin} className="">
              {task.pinned ? (
                <FilledIcons.StarIcon className="w-6 h-6 text-yellow-500 opacity-100 duration-200" />
              ) : (
                <Icons.StarIcon className="w-6 h-6 text-white opacity-100 duration-200" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
