# Columnia

React 애플리케이션을 위한 유연하고 커스터마이즈 가능한 테이블 컴포넌트입니다.
컬럼 선택 및 재정렬 기능을 제공합니다.

## 주요 기능

- 🔄 컬럼 선택 및 표시/숨김 토글
- 📦 드래그 앤 드롭을 통한 컬럼 순서 변경
- 💾 localStorage를 사용한 컬럼 설정 저장
- 📱 반응형 디자인
- 🎨 커스터마이즈 가능한 테마
- 📝 TypeScript 지원
- 🎯 커스텀 스타일링 지원

## 설치

```bash
npm install columnia
# 또는
yarn add columnia
```

## 사용 예시

```tsx
import { Table } from "columnia";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { key: "id", label: "ID", width: 100 },
  { key: "name", label: "이름", width: 200 },
  { key: "email", label: "이메일", width: 300 },
  { key: "role", label: "역할", width: 150 },
];

const data = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
];

function App() {
  return (
    <Table
      data={data}
      columns={columns}
      storageKey="user-table-settings"
      theme={{
        primary: "#0ea5e9",
        secondary: "#64748b",
        background: "#ffffff",
        text: "#1f2937",
        border: "#e5e7eb",
      }}
    />
  );
}
```

## Props

| Prop       | Type                   | 설명                                   |
| ---------- | ---------------------- | -------------------------------------- |
| data       | `T[]`                  | 테이블에 표시할 데이터 배열            |
| columns    | `Column<T>[]`          | 컬럼 정의 배열                         |
| storageKey | `string?`              | 컬럼 설정을 저장할 localStorage 키     |
| className  | `string?`              | 테이블 컨테이너에 추가할 CSS 클래스    |
| style      | `React.CSSProperties?` | 테이블 컨테이너에 추가할 인라인 스타일 |
| theme      | `Theme?`               | 커스텀 테마 설정                       |

## 컬럼 정의

```typescript
interface Column<T> {
  key: keyof T; // 데이터 객체의 키
  label: string; // 컬럼 헤더에 표시될 텍스트
  width?: number; // 컬럼 너비 (선택사항)
  sortable?: boolean; // 정렬 가능 여부 (선택사항)
  hidden?: boolean; // 숨김 여부 (선택사항)
}
```

## 라이선스

MIT
