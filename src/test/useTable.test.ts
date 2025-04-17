import { act } from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTable } from "../useTable";
import { ColumnType } from "../types";
import { localStorageMock } from "./setup";

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
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

  it("localStorage에서 저장된 컬럼 선택을 불러와야 한다", () => {
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({ selected: ["name", "email"] })
    );

    const { result } = renderHook(() =>
      useTable({
        columns: mockColumns,
        storageKey: "test-key",
      })
    );

    expect(result.current.visibleColumns).toHaveLength(2);
    expect(result.current.isSelected("name")).toBe(true);
    expect(result.current.isSelected("age")).toBe(false);
    expect(result.current.isSelected("email")).toBe(true);
  });

  it("컬럼 선택을 토글할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useTable({
        columns: mockColumns,
        storageKey: "test-key",
      })
    );

    act(() => {
      result.current.onToggleColumn("age");
    });

    expect(result.current.isSelected("age")).toBe(false);
    expect(result.current.visibleColumns).toHaveLength(2);
    expect(result.current.visibleColumns).not.toContainEqual(
      expect.objectContaining({ key: "age" })
    );

    act(() => {
      result.current.onToggleColumn("age");
    });

    expect(result.current.isSelected("age")).toBe(true);
    expect(result.current.visibleColumns).toHaveLength(3);
  });

  it("컬럼을 초기 상태로 리셋할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useTable({
        columns: mockColumns,
        storageKey: "test-key",
      })
    );

    act(() => {
      result.current.onToggleColumn("age");
      result.current.onToggleColumn("email");
    });

    act(() => {
      result.current.onResetColumns();
    });

    expect(result.current.visibleColumns).toHaveLength(3);
    expect(result.current.isSelected("name")).toBe(true);
    expect(result.current.isSelected("age")).toBe(true);
    expect(result.current.isSelected("email")).toBe(true);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("test-key");
  });

  it("컬럼 선택이 변경될 때 localStorage에 저장해야 한다", async () => {
    const { result } = renderHook(() =>
      useTable({
        columns: mockColumns,
        storageKey: "test-key",
      })
    );

    // 초기 상태 확인
    expect(result.current.isSelected("age")).toBe(true);

    // age 컬럼 토글
    await act(async () => {
      result.current.onToggleColumn("age");
    });

    // 상태 변경 확인
    expect(result.current.isSelected("age")).toBe(false);
    expect(result.current.visibleColumns).toHaveLength(2);

    // localStorage 호출 확인
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "test-key",
      expect.any(String)
    );

    // 마지막 호출의 데이터 확인
    const lastCallIndex = localStorageMock.setItem.mock.calls.length - 1;
    const savedData = JSON.parse(
      localStorageMock.setItem.mock.calls[lastCallIndex][1]
    );

    expect(savedData.selected).toHaveLength(2);
    expect(savedData.selected).toContain("name");
    expect(savedData.selected).toContain("email");
    expect(savedData.selected).not.toContain("age");
  });
});
