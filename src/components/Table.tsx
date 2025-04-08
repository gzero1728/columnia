import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps } from "../types";
import { useTable } from "../hooks/useTable";
import { arrayMove } from "../utils";

export function Table<T extends object>({
  columns,
  data,
  storageKey,
  renderTableController,
  renderTableContent,
}: TableProps<T>) {
  return (
    <TableProvider columns={columns} storageKey={storageKey}>
      <TableWrapper
        data={data}
        renderTableController={renderTableController}
        renderTableContent={renderTableContent}
      />
    </TableProvider>
  );
}

function TableWrapper<T extends object>({
  data,
  renderTableController,
  renderTableContent,
}: {
  data: T[];
  renderTableController?: TableProps<T>["renderTableController"];
  renderTableContent?: TableProps<T>["renderTableContent"];
}) {
  const { columns, selectedColumns, setColumns, setSelectedColumns } =
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
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(
        (col) => String(col.key) === active.id
      );
      const newIndex = columns.findIndex((col) => String(col.key) === over?.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  return (
    <div>
      {renderTableController ? (
        renderTableController({
          columns,
          selectedColumns,
          onColumnToggle: handleColumnToggle,
          onReset: handleReset,
        })
      ) : (
        <TableController columns={columns} />
      )}
      {renderTableContent ? (
        renderTableContent({
          data,
          columns: columns.filter((col) => selectedColumns.has(col.key)),
          selectedColumns,
          onDragEnd: handleDragEnd,
        })
      ) : (
        <TableContent data={data} />
      )}
    </div>
  );
}
