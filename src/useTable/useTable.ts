import { useEffect, useState } from "react";
import type { UseTableProps, UseTableReturnType } from "./types";

export const useTable = <T extends object>(
  options: UseTableProps<T>
): UseTableReturnType<T> => {
  const { columns: initialColumns, storageKey } = options;

  const initialState = setInitialState();
  const [selectedColumns, setSelectedColumns] = useState<Set<keyof T>>(
    initialState.selectedColumns
  );

  function setInitialState() {
    if (!storageKey) {
      return {
        selectedColumns: new Set(initialColumns.map((col) => col.key)),
      };
    }

    try {
      const savedSettings = localStorage.getItem(storageKey);
      if (savedSettings) {
        const { selected } = JSON.parse(savedSettings);

        // 저장된 설정 유효성 검사
        if (Array.isArray(selected)) {
          const validSelected = selected.filter((key: keyof T) =>
            initialColumns.some((col) => col.key === key)
          );

          if (validSelected.length > 0) {
            return {
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
      selectedColumns: new Set(initialColumns.map((col) => col.key)),
    };
  }

  function getVisibleColumns() {
    return initialColumns.filter((col) => isSelected(col.key));
  }

  function isSelected(columnKey: keyof T) {
    return selectedColumns.has(columnKey);
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
    setSelectedColumns(new Set(initialColumns.map((col) => col.key)));
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }

  // 선택된 컬럼이 변경될 때 저장
  useEffect(() => {
    if (storageKey) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            selected: Array.from(selectedColumns),
          })
        );
      } catch (error) {
        console.error("선택된 컬럼을 저장하는데 실패했습니다:", error);
      }
    }
  }, [selectedColumns, storageKey]);

  return {
    visibleColumns: getVisibleColumns(),
    isSelected,
    onToggleColumn,
    onResetColumns,
  };
};
