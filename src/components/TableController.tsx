import { useTable } from "../hooks/useTable";
import { Column } from "../types";

interface TableControllerProps<T extends object> {
  columns: Column<T>[];
}

export function TableController<T extends object>({
  columns,
}: TableControllerProps<T>) {
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

  return (
    <div>
      <div>
        {columns.map((column) => (
          <label key={String(column.key)}>
            <input
              type="checkbox"
              checked={selectedColumns.has(column.key)}
              onChange={() => handleColumnToggle(column.key)}
            />
            {column.label}
          </label>
        ))}
      </div>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
}
