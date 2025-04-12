import { useContext } from "react";
import { TableContext } from "../context";
import { TableContextType } from "../types";

export const useTable = <T extends object>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context as unknown as TableContextType<T>;
};
