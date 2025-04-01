export type Column<T> = {
  key: keyof T;
  label: string;
  width?: number;
  sortable?: boolean;
  hidden?: boolean;
};

export type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  storageKey?: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    border?: string;
  };
};

export type TableContextType<T extends object> = {
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
  selectedColumns: Set<keyof T>;
  setSelectedColumns: (columns: Set<keyof T>) => void;
  theme: TableProps<T>["theme"];
  storageKey?: string;
};
