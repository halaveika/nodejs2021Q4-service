import { Column } from "./Column.type";

export type Board = {
  id: string,
  title: string,
  columns: Column[],
}
