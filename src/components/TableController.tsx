import { useTable } from "../hooks/useTable";
import { Column, TableProps } from "../types";

type TableControllerProps<T extends object> = {
  columns: Column<T>[];
  renderController?: TableProps<T>["renderController"];
};

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

  if (renderController) {
    return renderController({
      columns,
      selectedColumns,
      onColumnToggle: handleColumnToggle,
      onReset: handleReset,
    });
  }

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
};
