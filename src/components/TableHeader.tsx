import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableHeaderProps } from "../types";

/**
 * TableHeader 컴포넌트는 th 태그를 사용하여 테이블 헤더를 렌더링합니다.
 * 이 컴포넌트는 드래그 앤 드롭 기능을 제공하며, th 태그의 모든 속성을 사용할 수 있습니다.
 * @example
 * ```tsx
 * <TableHeader column={column}>
 *   {column.label}
 * </TableHeader>
 * ```
 */
export const TableHeader = <T extends object>({
  column,
  children,
}: TableHeaderProps<T>) => {
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
