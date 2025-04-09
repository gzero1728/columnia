import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps, TableWrapperProps, SortableHeaderProps } from "../types";
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

/**
 * SortableHeader 컴포넌트는 th 태그를 사용하여 테이블 헤더를 렌더링합니다.
 * 이 컴포넌트는 드래그 앤 드롭 기능을 제공하며, th 태그의 모든 속성을 사용할 수 있습니다.
 * @example
 * ```tsx
 * <SortableHeader column={column}>
 *   {column.label}
 * </SortableHeader>
 * ```
 */
export const SortableHeader = <T extends object>({
  column,
  children,
}: SortableHeaderProps<T>) => {
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
      {children || column.label}
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
