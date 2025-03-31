import React, { useState, useEffect } from "react";
import { TableContextType, Column, TableProps } from "../types";
import { TableContext } from "./createContext";

export function TableProvider<T extends object>({
  children,
  columns: initialColumns,
  storageKey,
  theme,
}: {
  children: React.ReactNode;
  columns: Column<T>[];
  storageKey?: string;
  theme?: TableProps<T>["theme"];
}) {
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [selectedColumns, setSelectedColumns] = useState<Set<keyof T>>(
    new Set(initialColumns.map((col) => col.key))
  );

  useEffect(() => {
    if (storageKey) {
      const savedColumns = localStorage.getItem(storageKey);
      if (savedColumns) {
        const parsed = JSON.parse(savedColumns);
        setSelectedColumns(new Set(parsed));
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify(Array.from(selectedColumns))
      );
    }
  }, [selectedColumns, storageKey]);

  const value: TableContextType<T> = {
    columns,
    setColumns,
    selectedColumns,
    setSelectedColumns,
    theme,
  };
  return (
    <TableContext.Provider value={value as unknown as TableContextType<object>}>
      {children}
    </TableContext.Provider>
  );
}
