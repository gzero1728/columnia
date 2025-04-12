export type ColumnType<T> = {
  key: keyof T;
  label: string;
};

export type UseTableProps<T extends object> = {
  columns: ColumnType<T>[];
  storageKey: string;
};

export type UseTableReturnType<T extends object> = {
  visibleColumns: ColumnType<T>[];
  selectedColumns: Set<keyof T>;
  onToggleColumn: (columnKey: keyof T) => void;
  onResetColumns: () => void;
};
