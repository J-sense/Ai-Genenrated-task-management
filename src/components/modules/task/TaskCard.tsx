/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Loader2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: "pending" | "completed";
//   dueDate: string;
// };

// type TaskCardProps = {
//   task: Task;
//   onEdit: (task: Task) => void;
//   onDelete: (taskId: string) => void;
// };

const TaskCard = ({ task, onEdit, onDelete }: any) => {
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const generateSubtasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/sub-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskTitle: task.title }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate subtasks");
      }

      const data = await res.json();
      setSubtasks(data.subtasks);
      setShowSubtasks(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDescription = () => setExpanded(!expanded);
  const toggleSubtasks = () => setShowSubtasks(!showSubtasks);

  return (
    <div className="w-full max-w-md mx-auto group">
      <Card className="shadow-lg border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:border-gray-200">
        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 pr-6">
              {task.title}
            </CardTitle>
            <Badge
              variant={task.status === "completed" ? "default" : "secondary"}
              className={cn(
                "shrink-0",
                task.status === "completed"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              )}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {task.description && (
            <div className="mb-4">
              <button
                onClick={toggleDescription}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                <span>Description</span>
              </button>
              {expanded && (
                <p className="mt-2 text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                  {task.description}
                </p>
              )}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700"
            onClick={generateSubtasks}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? "Generating..." : "AI Suggest Subtasks"}
          </Button>

          {subtasks.length > 0 && (
            <div className="mt-4">
              <button
                onClick={toggleSubtasks}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-2"
              >
                {showSubtasks ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
                <span>Suggested Subtasks ({subtasks.length})</span>
              </button>

              {showSubtasks && (
                <ul className="space-y-2">
                  {subtasks.map((subtask, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="shrink-0 mt-0.5 size-4 rounded-full border-2 border-blue-300"></span>
                      <span className="text-sm text-gray-700">{subtask}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
