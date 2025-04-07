import { TableProvider } from "../context/context";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps } from "../types";

export function Table<T extends object>({
  columns,
  data,
  storageKey,
  theme,
  renderTableController,
  renderTableContent,
}: TableProps<T>) {
  return (
    <TableProvider columns={columns} storageKey={storageKey} theme={theme}>
      <div>
        <TableController
          columns={columns}
          renderTableController={renderTableController}
        />
        <TableContent data={data} renderTableContent={renderTableContent} />
      </div>
    </TableProvider>
  );
}
