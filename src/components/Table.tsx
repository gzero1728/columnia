import { TableProvider } from "../context/context";
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
      <div>
        <TableController
          columns={columns}
          renderController={renderController}
        />
        <TableContent data={data} renderContent={renderContent} />
      </div>
    </TableProvider>
  );
};
