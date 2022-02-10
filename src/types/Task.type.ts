export type Task = {
  id?: string,
  title: string,
  order: number | null,
  description?: string | null,
  userId?: string | null,
  boardId?: string,
  columnId?: string | null,
}