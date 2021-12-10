export type Task = {
  id: string,
  title: string,
  order: number | null,
  description: string,
  userId: string | null,
  boardId: string,
  columnId: string | null,
}