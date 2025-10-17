import api from "@/lib/axios";
import {
  taskSchema,
  type Project,
  type Task,
  type TaskFormData,
} from "@/types";
import { isAxiosError } from "axios";

type TaskApiType = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export const createTask = async ({
  formData,
  projectId,
}: Pick<TaskApiType, "formData" | "projectId">) => {
  try {
    const url = `/projects/${projectId}/tasks`;
    const response = await api.post<string>(url, formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskApiType, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);
    const response = taskSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Invalid task data");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskApiType, "projectId" | "taskId" | "formData">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskApiType, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
