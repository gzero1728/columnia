import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column } from "../types";
import { useTable } from "../hooks/useTable";

const SortableHeader = <T extends object>({
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

export const TableContent = <T extends object>({
  data,
  className,
  style,
}: {
  data: T[];
  className?: string;
  style?: React.CSSProperties;
}) => {
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
    <div style={style} className={className}>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table>
            <thead>
              <tr>
                <SortableContext
                  items={visibleColumns.map(
                    (col) => String(col.key) as UniqueIdentifier
                  )}
                  strategy={horizontalListSortingStrategy}
                >
                  {visibleColumns.map((column) => (
                    <SortableHeader key={String(column.key)} column={column} />
                  ))}
                </SortableContext>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {visibleColumns.map((column) => (
                    <td key={String(column.key)}>{String(row[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DndContext>
      </div>
    </div>
  );
};
