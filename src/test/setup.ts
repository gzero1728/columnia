import "@testing-library/jest-dom";
import { Mock, vi } from "vitest";

export interface MockStorage {
  getItem: Mock;
  setItem: Mock;
  removeItem: Mock;
  clear: Mock;
  length: number;
  key: Mock;
}

export const localStorageMock: MockStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
