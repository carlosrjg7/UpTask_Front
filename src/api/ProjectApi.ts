import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  type Project,
  type ProjectsFormData,
} from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectsFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api("/projects");
    const response = dashboardProjectSchema.safeParse(data);
    console.log(response);
    if (response.success) return response.data;
    else throw new Error("Error al obtener los proyectos");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error);
    }
  }
}

export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error);
    }
  }
}

type ProjectApiType = {
  formData: ProjectsFormData;
  projectId: Project["_id"];
};

export async function updateProject({ formData, projectId }: ProjectApiType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error);
    }
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.error);
    }
  }
}
