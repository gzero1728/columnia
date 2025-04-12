export type ColumnType<T> = {
  key: keyof T;
  label: string;
};

export type RenderControllerProps<T extends object> = {
  columns: ColumnType<T>[];
  selectedColumns: Set<keyof T>;
  onColumnToggle: (columnKey: keyof T) => void;
  onReset: () => void;
};

export type RenderContentProps<T extends object> = {
  data: T[];
  columns: ColumnType<T>[];
  selectedColumns: Set<keyof T>;
  TableHeader: React.ComponentType<TableHeaderProps<T>>;
};

export type TableProps<T extends object> = {
  data: T[];
  columns: ColumnType<T>[];
  storageKey: string;
  renderController?: (props: RenderControllerProps<T>) => React.ReactNode;
  renderContent?: (props: RenderContentProps<T>) => React.ReactNode;
};

export type TableContextType<T extends object> = {
  columns: ColumnType<T>[];
  setColumns: (columns: ColumnType<T>[]) => void;
  selectedColumns: Set<keyof T>;
  setSelectedColumns: (columns: Set<keyof T>) => void;
  storageKey?: string;
};

export type SetStateAction<T> = T | ((prevState: T) => T);

export type TableProviderProps<T extends object> = {
  children: React.ReactNode;
  columns: ColumnType<T>[];
  storageKey?: string;
};

export type TableWrapperProps<T extends object> = {
  data: T[];
  renderController?: TableProps<T>["renderController"];
  renderContent?: TableProps<T>["renderContent"];
};

export type TableHeaderProps<T extends object> = {
  column: ColumnType<T>;
  children?: React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

export type TableControllerProps<T extends object> = {
  columns: ColumnType<T>[];
  renderController?: TableProps<T>["renderController"];
};

export type TableContentProps<T extends object> = {
  data: T[];
  renderContent?: (props: RenderContentProps<T>) => React.ReactNode;
};
