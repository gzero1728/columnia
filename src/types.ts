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
  renderTableController?: (props: {
    columns: Column<T>[];
    selectedColumns: Set<keyof T>;
    onColumnToggle: (columnKey: keyof T) => void;
    onReset: () => void;
  }) => React.ReactNode;
  renderTableContent?: (props: {
    data: T[];
    columns: Column<T>[];
    selectedColumns: Set<keyof T>;
    onDragEnd: (event: any) => void;
  }) => React.ReactNode;
};

export type TableContextType<T extends object> = {
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
  selectedColumns: Set<keyof T>;
  setSelectedColumns: (columns: Set<keyof T>) => void;
  theme: TableProps<T>["theme"];
  storageKey?: string;
};
