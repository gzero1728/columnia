import { TableProvider } from "../context/provider";
import { TableContent } from "./TableContent";
import { TableController } from "./TableController";
import { TableProps } from "../types";

export const Table = <T extends object>({
  columns,
  data,
  storageKey,
  renderController,
  renderContent,
}: TableProps<T>) => {
  return (
    <TableProvider columns={columns} storageKey={storageKey}>
      <TableController columns={columns} renderController={renderController} />
      <TableContent data={data} renderContent={renderContent} />
    </TableProvider>
  );
};
