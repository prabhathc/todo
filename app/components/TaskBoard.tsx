"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Task from "./Task";
import { TaskType } from "../types/types";
import * as Icons from "@heroicons/react/24/outline";
import useMeasure from "react-use-measure";
import Tilt from "react-parallax-tilt";

export default function TaskBoard() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const [tasks, setTasks] = useState<TaskType[]>(storedTasks);
  const [nextTaskId, setNextTaskId] = useState<number>(
    storedTasks.length ? storedTasks[storedTasks.length - 1].id + 1 : 1
  );
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  let [ref, bounds] = useMeasure();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime(); // Initial call to set the time immediately

    return () => clearInterval(intervalId);
  }, []);

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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex max-w-screen-3xl max-h-screen w-full text-sm">
      <motion.div
        className="flex flex-col min-h-screen bg-white shadow-xl rounded-r-lg overflow-hidden"
        initial={{ width: "16rem" }}
        animate={{ width: isExpanded ? "16rem" : "4rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }}
      >
        <div className={`flex ${isExpanded ? "justify-end" : "justify-center"} transition-all duration-300 py-3 px-4 text-med-gray w-full`}>
          <button onClick={toggleSidebar}>
            {isExpanded ? (
              <Icons.ChevronLeftIcon className="w-6 h-6 text-med-gray text-bold" />
            ) : (
              <Icons.ChevronRightIcon className="w-6 h-6 text-med-gray text-bold" />
            )}
          </button>
        </div>
        <div className="overflow-auto h-full">
          {tasks.map((task) => (
            <motion.div
              onClick={() => setSelectedTask(task)}
              key={task.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: isExpanded
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { type: "spring", bounce: 0.1, opacity: { delay: 0.1 } },
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1, type: "spring", bounce: 0.3 }}
            >
              <Task key={task.id} task={task} deleteTask={deleteTask} isExpanded={isExpanded} />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-auto p-4"
            >
              <form onSubmit={addTask} className="flex flex-col items-center">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="p-2 mb-2 rounded-lg w-full"
                  placeholder="Task Title"
                />
                <input
                  type="text"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="p-2 mb-2 rounded-lg w-full"
                  placeholder="Task Description"
                />
                <button
                  type="submit"
                  className="shadow-sm p-4 bg-cool-gray text-white rounded-lg w-full"
                >
                  Add Task
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="flex flex-col w-full px-4 py-3 text-white">
        {/* Other content */}
        <div className="flex w-full text-2xl justify-end">
          July 1, 2024 {currentTime}
        </div>
        <div className="text-4xl py-2">
          {selectedTask ? selectedTask.title : "No task selected"}
        </div>
      </div>
    </div>
  );
}
