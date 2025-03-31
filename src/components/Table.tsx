import { TableProps } from "../types";
import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";

const TableComponent = <T extends object>({
  data,
  columns: initialColumns,
  storageKey,
  className,
  style,
  theme,
}: TableProps<T>) => {
  return (
    <TableProvider
      columns={initialColumns}
      storageKey={storageKey}
      theme={theme}
    >
      <TableContent data={data} className={className} style={style} />
    </TableProvider>
  );
};

export const Table = TableComponent as <T extends object>(
  props: TableProps<T>
) => JSX.Element;
