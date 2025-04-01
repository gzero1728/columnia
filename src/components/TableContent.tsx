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
import { cn } from "../utils";

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
      className="px-6 py-3 text-center text-base font-bold text-gray-700 uppercase tracking-wider cursor-move hover:bg-gray-100"
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
    <div className={cn("relative", className)} style={style}>
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-center">
                  {visibleColumns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center align-middle"
                    >
                      {String(row[column.key])}
                    </td>
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
