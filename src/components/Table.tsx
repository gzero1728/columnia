import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps } from "../types";

export function Table<T extends object>({
  columns,
  data,
  storageKey,
  theme,
}: TableProps<T>) {
  return (
    <TableProvider columns={columns} storageKey={storageKey} theme={theme}>
      <div>
        <TableController columns={columns} />
        <TableContent data={data} />
      </div>
    </TableProvider>
  );
}
