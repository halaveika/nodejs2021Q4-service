import { column } from "./Column.type";

export type Board = {
  id?: string,
  title: string,
  columns: column[],
}