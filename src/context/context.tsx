import { useState, useEffect } from "react";
import { TableContextType, Column, TableProviderProps } from "../types";
import { TableContext } from "./createContext";

export function TableProvider<T extends object>({
  children,
  columns: initialColumns,
  storageKey,
}: TableProviderProps<T>) {
  // 로컬 스토리지에서 초기 상태를 가져오는 함수
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

        // 저장된 설정 유효성 검사
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
                throw new Error(
                  `키가 ${String(key)}인 컬럼을 찾을 수 없습니다`
                );
              }
              return column;
            });

            // 저장된 순서에 없는 나머지 컬럼 추가
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
      console.error("저장된 설정을 불러오는데 실패했습니다:", error);
    }

    // 유효한 저장된 설정이 없을 경우 기본 상태 반환
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

  // 선택된 컬럼이 변경될 때 저장
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
        console.error("선택된 컬럼을 저장하는데 실패했습니다:", error);
      }
    }
  }, [selectedColumns, storageKey]);

  // 컬럼 순서가 변경될 때 저장
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
        console.error("컬럼 순서를 저장하는데 실패했습니다:", error);
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
