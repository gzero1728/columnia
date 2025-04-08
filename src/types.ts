import { DragEndEvent as DndKitDragEndEvent } from "@dnd-kit/core";

export type DragEndEvent = DndKitDragEndEvent;

export type Column<T> = {
  key: keyof T;
  label: string;
  width?: number;
  sortable?: boolean;
  hidden?: boolean;
};

export type TableControllerProps<T extends object> = {
  columns: Column<T>[];
  selectedColumns: Set<keyof T>;
  onColumnToggle: (columnKey: keyof T) => void;
  onReset: () => void;
};

export type TableContentProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  selectedColumns: Set<keyof T>;
  onDragEnd: (event: DragEndEvent) => void;
};

export type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  storageKey?: string;
  className?: string;
  renderTableController?: (props: TableControllerProps<T>) => React.ReactNode;
  renderTableContent?: (props: TableContentProps<T>) => React.ReactNode;
};

export type TableContextType<T extends object> = {
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
  selectedColumns: Set<keyof T>;
  setSelectedColumns: (columns: Set<keyof T>) => void;
  storageKey?: string;
};
export type SetStateAction<T> = T | ((prevState: T) => T);

export interface TableContentComponent
  extends React.FC<TableContentProps<any>> {
  <T extends object>(props: TableContentProps<T>): React.ReactElement;
}

export interface TableControllerComponent
  extends React.FC<TableControllerProps<any>> {
  <T extends object>(props: TableControllerProps<T>): React.ReactElement;
}

export type TableProviderProps<T extends object> = {
  children: React.ReactNode;
  columns: Column<T>[];
  storageKey?: string;
};
