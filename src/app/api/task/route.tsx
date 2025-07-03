/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
const tasks: any[] = [];
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status, dueDate } = body;

    if (!title || !status || !dueDate) {
      return NextResponse.json(
        { error: "Title, status, and due date are required." },
        { status: 400 }
      );
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description: description || "",
      status,
      dueDate,
    };

    tasks.push(newTask);

    return NextResponse.json(
      { message: "Task added successfully!", task: newTask },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add Task API error:", err);
    return NextResponse.json({ error: "Failed to add task." }, { status: 500 });
  }
}
export async function GET() {
  try {
    return NextResponse.json(tasks);
  } catch (err) {
    console.error("Get Tasks API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required." },
        { status: 400 }
      );
    }

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    const deletedTask = tasks.splice(index, 1);

    return NextResponse.json({
      message: "Task deleted successfully!",
      task: deletedTask[0],
    });
  } catch (err) {
    console.error("Delete Task API error:", err);
    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required." },
        { status: 400 }
      );
    }

    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    // Only update fields that are provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    return NextResponse.json({
      message: "Task updated successfully!",
      task,
    });
  } catch (err) {
    console.error("Patch Task API error:", err);
    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 }
    );
  }
}
