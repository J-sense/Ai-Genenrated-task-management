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
