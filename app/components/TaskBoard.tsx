"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Task from "./Task";
import { TaskType, ReminderType } from "../types/types";
import * as Icons from "@heroicons/react/24/outline";
import useMeasure from "react-use-measure";

export default function TaskBoard() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]").map((task: TaskType) => ({
    ...task,
    reminders: task.reminders || [],
  }));

  const [tasks, setTasks] = useState<TaskType[]>(storedTasks);
  const [nextTaskId, setNextTaskId] = useState<number>(
    storedTasks.length ? storedTasks[storedTasks.length - 1].id + 1 : 1
  );
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
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
    updateTime();

    return () => clearInterval(intervalId);
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: nextTaskId,
      title: newTaskTitle || "New Task",
      description: newTaskDescription || "Do the task",
      pinned: false,
      reminders: []
    };

    setTasks([...tasks, newTask]);
    setNextTaskId(nextTaskId + 1);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const togglePin = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));

  const addReminder = (taskId: number, reminderText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, reminders: [...task.reminders, { id: Date.now(), text: reminderText }] }
          : task
      )
    );
  };

  const deleteReminder = (taskId: number, reminderId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, reminders: task.reminders.filter((reminder) => reminder.id !== reminderId) }
          : task
      )
    );
  };

  return (
    <div className="flex max-w-screen-3xl max-h-screen w-full text-sm relative">
      <motion.div
        className="flex flex-col min-h-screen bg-white shadow-xl rounded-r-lg overflow-hidden"
        initial={{ width: "16rem" }}
        animate={{ width: "16rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }}
      >
        <div className="overflow-auto h-full pt-10">
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="cursor-pointer"
            >
              <div>
                <Task
                  task={task}
                  isSelected={selectedTask?.id === task.id}
                  deleteTask={deleteTask}
                  togglePin={togglePin}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
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
        </AnimatePresence>
      </motion.div>
      <div className="flex flex-col w-full px-4 py-3 text-white">
        <div className="flex w-full text-2xl justify-end">
          July 1, 2024 {currentTime}
        </div>
        <div className="text-4xl py-2">
          {selectedTask ? selectedTask.title : "No task selected"}
        </div>
        <div className="text-lg py-2">
          {selectedTask ? selectedTask.description : ""}
        </div>
        {selectedTask && (
          <div className="mt-4">
            <h3 className="text-2xl">Reminders</h3>
            <ul>
              {selectedTask.reminders.map((reminder) => (
                <li key={reminder.id} className="flex justify-between items-center py-1">
                  {reminder.text}
                  <Icons.XMarkIcon
                    className="w-4 h-4 text-red-500 ml-2 cursor-pointer"
                    onClick={() => deleteReminder(selectedTask.id, reminder.id)}
                  />
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("reminderText") as HTMLInputElement;
                addReminder(selectedTask.id, input.value);
                input.value = "";
              }}
              className="flex mt-2"
            >
              <input
                type="text"
                name="reminderText"
                className="p-2 rounded-lg w-full"
                placeholder="New Reminder"
              />
              <button type="submit" className="ml-2 p-2 bg-cool-gray text-white rounded-lg">
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}