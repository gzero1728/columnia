import React, { useState, useEffect } from "react";
import { TableContextType, Column } from "../types";
import { TableContext } from "./createContext";

export function TableProvider<T extends object>({
  children,
  columns: initialColumns,
  storageKey,
}: {
  children: React.ReactNode;
  columns: Column<T>[];
  storageKey?: string;
}) {
  // Initialize state with localStorage values if available
  const getInitialState = () => {
    if (!storageKey) {
      return {
        columns: initialColumns,
        selectedColumns: new Set(initialColumns.map((col) => col.key)),
      };
    }

    try {
      const savedSettings = localStorage.getItem(storageKey);
      if (savedSettings) {
        const { selected, order } = JSON.parse(savedSettings);

        // Validate saved settings
        if (Array.isArray(selected) && Array.isArray(order)) {
          const validSelected = selected.filter((key: keyof T) =>
            initialColumns.some((col) => col.key === key)
          );

          const validOrder = order.filter((key: keyof T) =>
            initialColumns.some((col) => col.key === key)
          );

          if (validSelected.length > 0 && validOrder.length > 0) {
            const orderedColumns = validOrder.map((key: keyof T) => {
              const column = initialColumns.find((col) => col.key === key);
              if (!column) {
                throw new Error(`Column with key ${String(key)} not found`);
              }
              return column;
            });

            // Add any remaining columns that weren't in the saved order
            initialColumns.forEach((column) => {
              if (!validOrder.includes(column.key)) {
                orderedColumns.push(column);
              }
            });

            return {
              columns: orderedColumns,
              selectedColumns: new Set(validSelected),
            };
          }
        }
      }
    } catch (error) {
      console.error("Failed to load saved settings:", error);
    }

    // Return default state if no valid saved settings
    return {
      columns: initialColumns,
      selectedColumns: new Set(initialColumns.map((col) => col.key)),
    };
  };

  const initialState = getInitialState();
  const [columns, setColumns] = useState<Column<T>[]>(initialState.columns);
  const [selectedColumns, setSelectedColumns] = useState<Set<keyof T>>(
    initialState.selectedColumns
  );

  // Save selected columns when they change
  useEffect(() => {
    if (storageKey) {
      try {
        const savedSettings = localStorage.getItem(storageKey);
        const currentSettings = savedSettings ? JSON.parse(savedSettings) : {};

        localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...currentSettings,
            selected: Array.from(selectedColumns),
          })
        );
      } catch (error) {
        console.error("Failed to save selected columns:", error);
      }
    }
  }, [selectedColumns, storageKey]);

  // Save column order when it changes
  useEffect(() => {
    if (storageKey) {
      try {
        const savedSettings = localStorage.getItem(storageKey);
        const currentSettings = savedSettings ? JSON.parse(savedSettings) : {};

        localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...currentSettings,
            order: columns.map((col) => col.key),
          })
        );
      } catch (error) {
        console.error("Failed to save column order:", error);
      }
    }
  }, [columns, storageKey]);

  const value: TableContextType<T> = {
    columns,
    setColumns,
    selectedColumns,
    setSelectedColumns,
    storageKey,
  };

  return (
    <TableContext.Provider value={value as unknown as TableContextType<object>}>
      {children}
    </TableContext.Provider>
  );
}
