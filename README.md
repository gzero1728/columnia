# Columnia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React 애플리케이션을 위한 테이블 컬럼 관리 훅입니다.
컬럼 선택/해제 기능과 설정 저장 기능을 제공하며, UI 구현은 사용자에게 위임합니다.

## 주요 기능

- 📊 컬럼 관리
  - 컬럼 선택/해제 기능
  - 선택된 컬럼 설정 저장/불러오기 (localStorage)

## 설치

```bash
npm install columnia
# 또는
yarn add columnia
```

## 사용방법

### 기본 사용법

```tsx
import { useTable } from "columnia";

interface User {
  name: string;
  age: number;
  email: string;
}

function TableComponent() {
  const columns = [
    { key: "name", label: "이름" },
    { key: "age", label: "나이" },
    { key: "email", label: "이메일" },
  ];

  const { visibleColumns, isSelected, onToggleColumn, onResetColumns } =
    useTable<User>({
      columns,
      storageKey: "my-table-columns", // localStorage에 저장될 키
    });

  return (
    <div>
      {/* 컬럼 선택 UI */}
      <div>
        {columns.map((column) => (
          <label key={column.key}>
            <input
              type="checkbox"
              checked={isSelected(column.key)}
              onChange={() => onToggleColumn(column.key)}
            />
            {column.label}
          </label>
        ))}
        <button onClick={onResetColumns}>초기화</button>
      </div>

      {/* 테이블 */}
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{/* 테이블 데이터 */}</tbody>
      </table>
    </div>
  );
}
```

### API

#### useTable

```typescript
const {
  visibleColumns, // 현재 보이는 컬럼들
  isSelected, // 컬럼이 선택되었는지 확인하는 함수
  onToggleColumn, // 컬럼 선택/해제 토글 함수
  onResetColumns, // 컬럼 선택 초기화 함수
} = useTable<T>({
  columns: Column < T > [], // 컬럼 정의 배열
  storageKey: string, // localStorage 키 (선택사항)
});
```

#### Column 타입

```typescript
interface Column<T> {
  key: keyof T; // 컬럼 키 (데이터 객체의 키)
  label: string; // 컬럼 표시 이름
}
```

### 특징

- 제네릭 타입 지원: 테이블 데이터의 타입을 명시적으로 지정할 수 있습니다.
- 자동 저장: 컬럼 선택 상태가 변경될 때마다 자동으로 localStorage에 저장됩니다.
- 초기화 기능: `onResetColumns`로 모든 컬럼을 초기 상태로 되돌릴 수 있습니다.
