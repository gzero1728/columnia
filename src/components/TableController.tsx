import { useTable } from "../hooks/useTable";
import { Column } from "../types";
import { cn } from "../utils";

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
    // Reset selected columns to all columns
    setSelectedColumns(new Set(columns.map((col) => col.key)));
    // Reset column order to initial order
    setColumns(columns);
    // Clear localStorage if storageKey exists
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {columns.map((column) => (
          <label
            key={String(column.key)}
            className={cn(
              "px-3 py-1 rounded-full text-sm cursor-pointer transition-colors",
              selectedColumns.has(column.key)
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            )}
          >
            <input
              type="checkbox"
              checked={selectedColumns.has(column.key)}
              onChange={() => handleColumnToggle(column.key)}
              className="hidden"
            />
            {column.label}
          </label>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
      >
        초기화
      </button>
    </div>
  );
}
