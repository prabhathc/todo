"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Task from "./Task";
import { TaskType } from "../types/types";

export default function TaskBoard() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const [tasks, setTasks] = useState<TaskType[]>(storedTasks);
  const [nextTaskId, setNextTaskId] = useState<number>(
    storedTasks.length ? storedTasks[storedTasks.length - 1].id + 1 : 1
  );
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: nextTaskId,
      title: newTaskTitle || "New Task",
      description: newTaskDescription || "Do the task",
    };

    setTasks([...tasks, newTask]);
    setNextTaskId(nextTaskId + 1);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex max-w-screen-3xl w-full">
      <div className="flex flex-col min-h-screen bg-white shadow-xl rounded-lg w-96">
        <div className="p-4 overflow-auto h-full ">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Task key={task.id} task={task} deleteTask={deleteTask} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-auto p-4">
            <form onSubmit={addTask} className="flex flex-col items-center">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="shadow-sm p-2 mb-2 rounded-lg w-full"
                placeholder="Task Title"
              />
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="shadow-sm p-2 mb-2 rounded-lg w-full"
                placeholder="Task Description"
              />
              <button
                type="submit"
                className="shadow-sm p-4 bg-cool-gray text-white rounded-lg w-full"
              >
                Add Task
              </button>
            </form>
          </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
