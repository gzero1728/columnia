export type Column<T> = {
  key: keyof T;
  label: string;
  width?: number;
  sortable?: boolean;
  hidden?: boolean;
};

export type RenderControllerProps<T extends object> = {
  columns: Column<T>[];
  selectedColumns: Set<keyof T>;
  onColumnToggle: (columnKey: keyof T) => void;
  onReset: () => void;
};

export type RenderContentProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  selectedColumns: Set<keyof T>;
  SortableHeader: React.ComponentType<SortableHeaderProps<T>>;
};

export type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  storageKey?: string;
  className?: string;
  renderController?: (props: RenderControllerProps<T>) => React.ReactNode;
  renderContent?: (props: RenderContentProps<T>) => React.ReactNode;
};

export type TableContextType<T extends object> = {
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
  selectedColumns: Set<keyof T>;
  setSelectedColumns: (columns: Set<keyof T>) => void;
  storageKey?: string;
};
export type SetStateAction<T> = T | ((prevState: T) => T);

export type TableProviderProps<T extends object> = {
  children: React.ReactNode;
  columns: Column<T>[];
  storageKey?: string;
};

export type TableContentProps<T extends object> = {
  data: T[];
  renderContent?: TableProps<T>["renderContent"];
};

export type TableWrapperProps<T extends object> = {
  data: T[];
  renderController?: TableProps<T>["renderController"];
  renderContent?: TableProps<T>["renderContent"];
};

export type SortableHeaderProps<T extends object> = {
  column: Column<T>;
  children?: React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableCellElement>;
