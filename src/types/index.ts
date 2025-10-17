import { z } from "zod";

/* Task */
export const taskStatusSchema = z.enum([
  "pending",
  "inProgress",
  "onHold",
  "underReview",
  "completed",
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .nonempty({ message: "El nombre de la tarea es obligatorio" }),
  project: z.string(),
  status: taskStatusSchema,
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripción no puede superar los 500 caracteres",
    }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskFormSchema = taskSchema.pick({
  name: true,
  description: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/* Projets */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripción no puede superar los 500 caracteres",
    }),
});

export const projectFormSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectsFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;
