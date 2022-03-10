type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

export default TaskType;
