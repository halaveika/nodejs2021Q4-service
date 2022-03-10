import ColumnType from './column-type';

type BoardType = {
  id: string;
  title: string;
  columns: ColumnType[];
};

export default BoardType;
