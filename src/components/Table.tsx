import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps, TableWrapperProps } from "../types";
import { useTable } from "../hooks/useTable";
import { arrayMove } from "../utils";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column } from "../types";

export const SortableHeader = <T extends object>({
  column,
}: {
  column: Column<T>;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(column.key) });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <th
      ref={setNodeRef}
      style={{ ...style, width: column.width }}
      {...attributes}
      {...listeners}
      scope="col"
    >
      {column.label}
    </th>
  );
};

export const Table = <T extends object>({
  columns,
  data,
  storageKey,
  renderController,
  renderContent,
}: TableProps<T>) => {
  return (
    <TableProvider columns={columns} storageKey={storageKey}>
      <TableWrapper
        data={data}
        renderController={renderController}
        renderContent={renderContent}
      />
    </TableProvider>
  );
};

const TableWrapper = <T extends object>({
  data,
  renderController,
  renderContent,
}: TableWrapperProps<T>) => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(
        (col) => String(col.key) === active.id
      );
      const newIndex = columns.findIndex((col) => String(col.key) === over?.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div>
      {renderController ? (
        renderController({
          columns,
          selectedColumns,
          onColumnToggle: handleColumnToggle,
          onReset: handleReset,
        })
      ) : (
        <TableController columns={columns} />
      )}
      {renderContent ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {renderContent({
            data,
            columns: columns.filter((col) => selectedColumns.has(col.key)),
            selectedColumns,
            SortableHeader: SortableHeader,
          })}
        </DndContext>
      ) : (
        <TableContent data={data} />
      )}
    </div>
  );
};
