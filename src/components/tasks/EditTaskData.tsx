import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const params = useParams();
  console.log(params);
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTaskId")!;
  console.log("Editing task with ID:", taskId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId && !!projectId,
    retry: false,
  });

  console.log(data);

  if (isLoading) return <div>Cargando...</div>;

  if (isError) return <Navigate to={"/404"} />;

  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
