import { useTable } from "../hooks/useTable";
import { TableControllerProps } from "../types";

export const TableController = <T extends object>({
  columns,
  renderController,
}: TableControllerProps<T>) => {
  const { selectedColumns, setSelectedColumns, setColumns, storageKey } =
    useTable<T>();

  const handleColumnToggle = (columnKey: keyof T) => {
    const newSelectedColumns = new Set(selectedColumns);
    if (newSelectedColumns.has(columnKey)) {
      newSelectedColumns.delete(columnKey);
    } else {
      newSelectedColumns.add(columnKey);
    }
    setSelectedColumns(newSelectedColumns);
  };

  const handleReset = () => {
    setSelectedColumns(new Set(columns.map((col) => col.key)));
    setColumns(columns);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return renderController({
    columns,
    selectedColumns,
    onColumnToggle: handleColumnToggle,
    onReset: handleReset,
  });
};
