/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Sparkles } from "lucide-react";
import AddTaskDialog from "./task/TaskModel";
import { allTask } from "../services/task";
import TaskCard from "./task/TaskCard";
import { useEffect, useState } from "react";

export function TaskInspiration() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await allTask();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const addNewTask = (newTask) => {
    if (newTask?.title) {
      // Basic validation
      setLoading(true);
      setTasks((prev) => [...prev, newTask]);
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/50 shadow-sm max-w-md mx-auto text-center space-y-6 backdrop-blur-sm">
        <div className="p-3 bg-white rounded-full shadow-inner border border-blue-100">
          <Sparkles className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {tasks?.length > 0
              ? "Boost Your Productivity"
              : "Start Your Productivity Journey"}
          </h1>
          <p className="text-gray-600 text-sm">
            {tasks?.length > 0
              ? `You have ${tasks?.length} task${
                  tasks?.length !== 1 ? "s" : ""
                } to complete`
              : "Add your first task and let our AI help you achieve more"}
          </p>
        </div>

        <AddTaskDialog onTaskAdded={addNewTask} />

        <div className="text-xs text-gray-400 mt-2">
          {tasks?.length > 0
            ? "Keep up the good work!"
            : "It only takes 10 seconds to get started"}
        </div>
      </div>

      {tasks?.length > 0 && (
        <div className="mt-8 space-y-3 grid grid-cols-3">
          {tasks?.map((task: any, idx: number) => (
            <TaskCard key={idx} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
