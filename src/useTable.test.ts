import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTable } from "./useTable";
import { ColumnType } from "./types";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useTable", () => {
  interface MockData {
    name: string;
    age: number;
    email: string;
  }

  const mockColumns: ColumnType<MockData>[] = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it("storageKey가 없을 때 모든 컬럼이 선택된 상태로 초기화되어야 한다", () => {
    const { result } = renderHook(() =>
      useTable({
        columns: mockColumns,
        storageKey: "",
      })
    );

    expect(result.current.visibleColumns).toHaveLength(3);
    expect(result.current.isSelected("name")).toBe(true);
    expect(result.current.isSelected("age")).toBe(true);
    expect(result.current.isSelected("email")).toBe(true);
  });
});
