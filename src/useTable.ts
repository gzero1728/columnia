import { useEffect, useState } from "react";
import { UseTableProps, UseTableReturnType } from "./types";
import { ColumnType } from "./types";

export const useTable = <T extends object>(
  options: UseTableProps<T>
): UseTableReturnType<T> => {
  const { columns: initialColumns, storageKey } = options;

  const initialState = getInitialState();
  const [columns, setColumns] = useState<ColumnType<T>[]>(initialState.columns);
  const [selectedColumns, setSelectedColumns] = useState<Set<keyof T>>(
    initialState.selectedColumns
  );

  function getInitialState() {
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
  }

  function onToggleColumn(columnKey: keyof T) {
    const newSelectedColumns = new Set(selectedColumns);
    if (newSelectedColumns.has(columnKey)) {
      newSelectedColumns.delete(columnKey);
    } else {
      newSelectedColumns.add(columnKey);
    }
    setSelectedColumns(newSelectedColumns);
  }

  function onResetColumns() {
    setSelectedColumns(new Set(columns.map((col) => col.key)));
    setColumns(columns);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }

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

  return {
    visibleColumns: columns.filter((col) => selectedColumns.has(col.key)),
    selectedColumns,
    onToggleColumn,
    onResetColumns,
  };
};
