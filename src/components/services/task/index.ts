/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const addTask = async (data: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const allTask = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/task`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const deleteTask = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/task?id=${id}`, {
      method: "DELETE",
    });

    return res.json();
  } catch (error: any) {
    console.error("Error deleting task:", error);
    return Error(error);
  }
};
export async function generateSubtasks(taskTitle: string) {
  const res = await fetch("http://localhost:3000/api/sub-tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskTitle }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate subtasks");
  }

  const data = await res.json();
  return data.subtasks; // ⬅️ return list of subtasks
}
export const updateTask = async (data: {
  id: string;
  title?: string;
  description?: string;
  status?: string;
}) => {
  try {
    const res = await fetch(`http://localhost:3000/api/task`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error: any) {
    console.error("Error updating task:", error);
    return Error(error);
  }
};
