import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTable } from "../hooks/useTable";
import { TableHeader } from "./TableHeader";
import { TableContentProps } from "../types";

export const TableContent = <T extends object>({
  data,
  renderContent,
}: TableContentProps<T>) => {
  const { columns, setColumns, selectedColumns } = useTable<T>();

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

  const visibleColumns = columns.filter((column) =>
    selectedColumns.has(column.key)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {renderContent({
        data,
        columns: visibleColumns,
        selectedColumns,
        TableHeader,
      })}
    </DndContext>
  );
};
