/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTask } from "@/components/services/task";

type TaskFormValues = {
  title: string;
  description: string;
  status: string;
};

export function EditModel({ open, setOpen, task }: any) {
  const { register, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      status: "",
    },
  });

  // when modal opens, set form values to current task
  useEffect(() => {
    if (task && open) {
      reset({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
      });
    }
  }, [task, open, reset]);

  const onSubmit = async (data: TaskFormValues) => {
    console.log("Updating Task:", data);
    await updateTask({ id: task.id, ...data });
    setOpen(false);
    reset();
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update your task details and click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
